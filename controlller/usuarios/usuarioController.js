const User = require('./../../models/usaurios/usuarioModel')
const bcrypt = require('bcrypt')
const createUserToken = require('../../helps/create-user-token')
module.exports = class usuarioController{

    static async criarUsuario(req, res){
        const  {nome, usuario, senha, nivel} = req.body
        if(!nome){
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }  
        if(!usuario){
            res.status(422).json({message: 'O usuaá é obrigatório'})
            return
        }  
        if(!senha){
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        }  
        if(!nivel){
            res.status(422).json({message: 'O nivel é obrigatório'})
            return
        }  
        const salt = await bcrypt.genSalt(12) 
        const senhaCriptografada = await bcrypt.hash(senha, salt) 

        const userExst = await User.findOne({where: { usuario: usuario }})
        if(userExst){
            res.status(422).json({message: "Usuário já existe."})
            return
        }



        const user = new User({
            nome: nome,
            usuario: usuario,
            senha: senhaCriptografada,
            nivel
        })

        try{
           const newUser =  await user.save()
           await createUserToken(newUser, req, res)
            
        } catch(error){
            res.status(500).json({message: error})
        }
        
    }

    static async login(req, res){
        const {usuario, senha} = req.body
        if(!usuario){
            res.status(422).json({message: 'O usuaá é obrigatório'})
            return
        }  
        if(!senha){
            res.status(422).json({message: 'A senha é obrigatória'})
            return
        } 

        const user = await User.findOne({where: { usuario: usuario }})
        if(!user){
            res.status(422).json({message: "Usuário invalido."})
            return
        }

        const checkSenha = await bcrypt.compare(senha, user.senha)
        if(!checkSenha){
          res.status(422).json({  message: 'Senha invalida!'})
          return
        }
        await createUserToken(user, req, res)

    }
}