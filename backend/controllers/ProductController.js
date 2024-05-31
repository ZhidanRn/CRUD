import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const getProduct = async(req, res) => {
    try{
        const response = await prisma.product.findMany();
        res.status(200).json(response);
        res.send("get all products")
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

export const getProductById = async(req, res) => {
    try{
        const response = await prisma.product.findUnique({
            where:{
                id: Number(req.params.id)
            }
        })
        res.status(200).json(response)
        res.send("get product by id")
    } catch (error){
        res.status(404).json({message: error.message})
    }
}

export const createProduct = async(req, res) => {
    const {name, price} = req.body;
    try {
        const product = await prisma.product.create({
            data: {
                name: name,
                price: price
            }
        })
        res.status(201).json(product)
        res.send("create list product")
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

export const updateProduct = async(req, res) => {
    const {name, price} = req.body;
    try {
        const product = await prisma.product.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: name,
                price: price
            }
        })
        res.status(201).json(product)
        res.send("update product")
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

export const deleteProduct = async(req, res) => {
    try {
        const product = await prisma.product.delete({
            where: {
                id: Number(req.params.id)
            },
        })
        res.status(201).json(product)
        res.send("delete product")
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}