const { User, Cart, Product, Cart_User } = require("../db");

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
                
                // const cart = await Cart.create({ ProductId: productData.id, Quantity: Number(quantity) })
                // userData.addCart(cart)

                const existingCart = await Cart.findOne({
                    where: {
                        //UserId: userData.id,
                        ProductId: productData.id
                    }
                });
    
                if (existingCart) {
                    // Aumentar la cantidad del producto existente en el carrito
                    existingCart.quantity += Number(quantity);
                    await existingCart.save()
                } else {
                    // Crear una nueva entrada de carrito para el producto
                    const cart = await Cart.create({ ProductId: productData.id, Quantity: Number(quantity) });
                    await userData.addCart(cart);
                }
                  
                const addedProduct = {
                    id: productData.id,
                    name: productData.name,
                    urlImage: productData.urlImage,
                    price: productData.price,
                    stock: productData.stock,
                    quantity: Number(quantity),
                  };

                return res.status(200).json({ added: true, msg: "Product added to cart",product:{ ...addedProduct, quantity, user } })

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

    addProductOne: async (req, res) => {
        try {
            const { user, product } = req.body;
        
            // Verificar si el usuario y el producto son números válidos
            if (!Number.isNaN(user) && !Number.isNaN(product)) {
              // Buscar el usuario en la base de datos
              const userData = await User.findByPk(user);
              if (userData == null) throw new Error("User not found");
        
              // Buscar el producto en el carrito del usuario
              const cartItem = await Cart.findOne({
                where: { UserId: userData.id, ProductId: product }
              });
        
              if (cartItem) {
                // Incrementar la cantidad del producto en 1
                cartItem.Quantity += 1;
                await cartItem.save();
                return res.status(200).json({ updated: true, msg: "Product quantity incremented" });
              } else {
                throw new Error("Product not found in user's cart");
              }
            }
        
            throw new Error("User or product ID is not valid");
          } catch (error) {
            return res.status(500).json({ updated: false, msg: error.message });
          }
    },

    //eliminar algun producto del carrito de algun usuario en especifico
    // RemoveProductInCart: async (req, res) => {
    //     const { idProduct, idUser } = req.body

    //     try {
    //         const user = await User.findByPk(idUser)
    //         const product = await user.getProducts({ where: { id: idProduct } })
    //         if (product != null) {

    //             await product.destroy()
    //             return res.status(200).json({ msg: "deleted product in list" })
    //         } else throw new Error("Product not Founded")

    //     } catch (error) {
    //         switch (error.message) {
    //             case "Product not Founded":
    //                 return res.status(500).json({ msg: error.message })
    //         }
    //     }
    // },

    RemoveProductInCart: async (req, res) => {
        const { idProduct, idUser } = req.params
        try {
            const user = await User.findByPk(idUser);
            if (!user) {
              throw new Error("User not found");
            }
        
            const product = await Product.findByPk(idProduct);
            if (!product) {
              throw new Error("Product not found");
            }
        
            // Eliminar el producto del carrito del usuario
            await user.removeProduct(product);
        
            return res.status(200).json({ msg: "Deleted product from cart" });
          } catch (error) {
            return res.status(500).json({ msg: error.message });
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

    getAllCart: async (req, res, next) => {
        Cart.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
    }

}