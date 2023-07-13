const { User, Cart, Product } = require("../db");

module.exports = {

    //permite agregar productos al carrito de algun usuario
    AddProduct: async (req, res) => {
        const { user, product, quantity } = req.body
        let userData = null

        console.log(req.body);

        try {
            if (!Number.isNaN(user) && !Number.isNaN(product) && !Number.isNaN(Number(quantity))) {


                const userData = await User.findByPk(Number(user))
                if (userData == null) throw new Error("user didn't found")

                const productData = await Product.findByPk(product)
                if (productData == null) throw new Error("product didn't found")

                console.log(quantity)

                const cart = await Cart.create({ productId: productData.id, Quantity: Number(quantity) })
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

    UpdateProductCart: async (req, res, next) => {
        const { userid, productid, quantity  } = req.body;
      
          try {
            await Cart.update({  Quantity: quantity }, {
                where: {
                 UserId: userid,
                 productId: productid
                }
              });
            res.status(200).json(req.body);
          } catch (e) {
            res.status(400).json(e.message);
          }

      },

    //eliminar algun producto del carrito de algun usuario en especifico
    RemoveProductInCart: async (req, res) => {
        const { productid, userid } = req.body

        try {
            await Cart.destroy( {
                where: {
                 UserId: userid,
                 productId: productid
                }
              });
            res.status(200).json(req.body);
          } catch (e) {
            res.status(400).json(e.message);
          }
    },

    RemoveProducts: async (req, res) => {
        const { userid } = req.body

        try {
            await Cart.destroy( {
                where: {
                 UserId: userid,
                }
              });
            res.status(200).json(req.body);
          } catch (e) {
            res.status(400).json(e.message);
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