import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get()
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            products
        })
    }

    @Post('/create')
    async createPost(@Res() res, @Body() createProductoDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductoDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            product
        });
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID: string){
        const product = await this.productService.getProduct(productID);
        if(!product) throw new NotFoundException('Product Does not exist');
        return res.status(HttpStatus.OK).json(product);
    }

    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productID') productID) {
        const productDeleted = await this.productService.deleteProduct(productID);
        if(!productDeleted) throw new NotFoundException('Product Does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Successfully',
            productDeleted
        });
    }

    @Put('/update')
    async updateProduct(@Res() res, @Query('productID') productID, @Body() createProductDTO: CreateProductDTO) {
        const productUpdated = await this.productService.updateProduct(productID, createProductDTO);
        if(!productUpdated) throw new NotFoundException('Product Does not exist');
        return res.status(HttpStatus.OK).json({
            messsage: 'Product Updated Successfully',
            productUpdated
        })
    }


}
