import{
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  Res
} from '@nestjs/common'
import { CatsService } from '../service'
import { CreateCatDto, UpdateCatDto } from '../dto'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { AuthGuard } from 'src/auth/auth.guard'
import { PaginationDto } from 'src/core/dto/pagination.dto'
import { get } from 'http'
import { FileInterceptor } from '@nestjs/platform-express'
import { IdDto } from 'src/core/dto/common.dto'
import { Response as ExpressResponse } from 'express'

@ApiTags('Cats API')
@Controller('cats')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
export class CatsController{
    constructor(
        private readonly catsService: CatsService
    ){}
    @Get()
    @ApiOperation({summary: 'Api to get all itemss'})
    async findAll(@Query() paginationDto: PaginationDto){
        return await this.catsService.findAll(paginationDto)
    }

    @Get(':id')
    @ApiOperation({ summary: 'api to get an item by id' })
    async findOne(@Param('id')  id: number) {
        return await this.catsService.findOne(id) 
    }

    
    @Get(':id/download-image')
    @ApiOperation({ summary: 'Download cat image' })
    async idImg(@Param('id') id: number, @Res() res: ExpressResponse): Promise<void> {
        return this.catsService.idImg(id, res);
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'api to create a new cat '})
    @ApiBody({ type: CreateCatDto })
    @UseInterceptors(FileInterceptor('file'))
    async create(
        @Body() createCatDto: CreateCatDto,
        @UploadedFile() file: Express.Multer.File)
        {
        return this.catsService.create(createCatDto, file)
    }


    @Patch(':id')
    @ApiConsumes('multipart/form-data')
    @ApiOperation({summary: 'Api to update cat by id'})
    @ApiBody({type: UpdateCatDto})
    @UseInterceptors(FileInterceptor('file'))
    update(
        @Param('id') id: number, 
        @Body() updateCatDto: UpdateCatDto,
        @UploadedFile() file: Express.Multer.File){
        return  this.catsService.update(id, updateCatDto, file)
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Api to delete an cat by id'})
    async remove(@Param('id') id: number){
        return await this.catsService.remove(id)
    }
}