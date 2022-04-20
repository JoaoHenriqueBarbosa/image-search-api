import { Injectable } from '@nestjs/common';
// import playwright from "playwright";
const playwright = require('playwright');

export type Image = {
  id: string;
  title: string;
  src: string;
  url: string;
};

@Injectable()
export class AppService {
  async getActualSrc(id: string, url: string): Promise<Image> {
    
    const browser = await playwright.firefox.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.goto(url);

    const getSrc = async (id: string, page: any, counter = 0): Promise<Partial<Image>> => {

      const img: Partial<Image> = await page.$$eval(
        `div[data-tbnid="${id}"]`,
        (elm: HTMLImageElement[]) => {
          const img = elm[1].querySelector('img');
          return ({
            src: img.src,
            title: img.alt
          })
        },
      );

      if (img.src.startsWith("data:image") && counter < 20) {
        await page.waitForTimeout(50);
        return getSrc(id, page, counter + 1)
      }

      return img;
    }

    const img = await getSrc(id, page);

    img.id = id;
    img.url = url;

    await browser.close();

    return img as Image;
  }

  async getImageList(searchText: string): Promise<Image[]> {
    const RESOURCE_EXCLUSTIONS = ['stylesheet', 'image', 'media', 'font', 'script', 'texttrack', 'xhr', 'fetch', 'eventsource', 'websocket', 'manifest', 'other'];
    
    const browser = await playwright.firefox.launch({
      headless: true,
    });

    const page = await browser.newPage();

    await page.route('**/*', (route) => {
      return RESOURCE_EXCLUSTIONS.includes(route.request().resourceType())
          ? route.abort()
          : route.continue()
    });

    await page.goto(`https://www.google.com/search?q=${searchText}&tbm=isch`);

    const images = await page.$$eval(
      '#islrg > div.islrc img',
      (elm: HTMLImageElement[]) =>
        elm
          .filter((d) => d.src.startsWith('data:image'))
          .map((d) => ({
            id: d.parentElement.parentElement.parentElement.getAttribute(
              'data-id',
            ),
            title: d.alt,
            src: d.src,
            url:
              window.location.href +
              '#imgrc=' +
              d.parentElement.parentElement.parentElement.getAttribute(
                'data-id',
              ),
          })),
    );

    await browser.close();

    return images;
  }
}
