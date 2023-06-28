const { User, Cart, Product } = require("../db");

module.exports = {

    //permite agregar productos al carrito de algun usuario
    AddProduct: async (req, res) => {
        const { user, product } = req.body
        let userData = null
        try {
            if (!Number.isNaN(user) && !Number.isNaN(product)) {
                userData = await User.findByPk(user)
                if (userData == null) throw new Error("user didn't found")
                else {

                    const response = await Product.findOne({ where: { id: product } })
                    if (response.stock) {
                        await Cart.create({ UserId: userData.id, ProductId: response.id })
                    }

                    return res.status(200).json({ msg: "Product added to cart" })
                }
            }
            throw new Error("user or product isn't number")

        } catch (error) {
            switch (error.message) {
                case "user didn't found":
                    return res.status(500).json({ msg: error.message })
                case "user or product isn't number":
                    return res.status(500).json({ msg: error.message })
                default:
                    return res.status(500).json({ msg: error.message })
            }
        }

    },

    //eliminar algun producto del carrito de algun usuario en especifico
    RemoveProductInCart: async (req, res) => {
        const { idProduct, idUser } = req.body

        try {
            const product = await Cart.findOne({ where: { ProductId: idProduct, UserId: idUser } })
            if (product != null) {

                await product.destroy()
                return res.status(200).json({ msg: "deleted product in list" })
            } else throw new Error("Product not Founded")

        } catch (error) {
            switch (error.message) {
                case "Product not Founded":
                    return res.status(500).json({ msg: error.message })
            }
        }
    },

    //permite adquirir el carrito de algun usuario en especifico en base a su id
    GetCartByAUser: async (req, res) => {
        const { id } = (req.params)
        try {
            if (id != undefined) {
                const cart = await Cart.findAll({ where: { UserId: id } })
                return res.status(200).json(cart)
            }
            throw new Error("User didn't found")
        } catch (error) {
            switch (error.message) {
                case "User didn't found":
                    return res.status(501).json({ msg: error.message })

                default:
                    return res.status(500).json({ msg: error.message })
            }
        }
    },

}