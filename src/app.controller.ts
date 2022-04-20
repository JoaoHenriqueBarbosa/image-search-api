import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService, Image } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/get-image-list/:searchText")
  getImageList(@Param('searchText') searchText: string): Promise<Image[]> {
    return this.appService.getImageList(searchText);
  }

  @Get("/get-image")
  getActualSrc(@Query('url') url: string, @Query('id') id: string): Promise<Image> {
    return this.appService.getActualSrc(id, url);
  }
}
