const { User, Cart, Product } = require("../db");

module.exports = {

    //permite agregar productos al carrito de algun usuario
    AddProduct: async (req, res) => {
        const { user, product, quantity } = req.body
        let userData = null

        console.log(user)
        console.log(product)
        console.log(Number.isNaN(Number(quantity)))

        try {
            if (!Number.isNaN(user) && !Number.isNaN(product) && !Number.isNaN(Number(quantity))) {


                const userData = await User.findByPk(user)
                if (userData == null) throw new Error("user didn't found")

                const productData = await Product.findByPk(product)
                if (productData == null) throw new Error("product didn't found")

                console.log(quantity)

                const cart = await Cart.create({ ProductId: productData.id, Quantity: Number(quantity) })
                userData.addCart(cart)

                return res.status(200).json({ added: true, msg: "Product added to cart" })

            }
            throw new Error("user or product isn't number")

        } catch (error) {
            switch (error.message) {
                case "user didn't found":
                    return res.status(500).json({ added: false, msg: error.message })
                case "user or product isn't number":
                    return res.status(500).json({ added: false, msg: error.message })
                default:
                    return res.status(501).json({ added: false, msg: error.message })
            }
        }

    },

    //eliminar algun producto del carrito de algun usuario en especifico
    RemoveProductInCart: async (req, res) => {
        const { idProduct, idUser } = req.body

        try {
            const user = await User.findByPk(idUser)
            const product = await user.getProducts({ where: { id: idProduct } })
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
                const user = await User.findByPk(id)
                if (user == null) throw new Error("User didn't found")
                const cart = await user.getCarts()
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