const schema = require('../schema/user')

    const validate = (req, res, next) => {
        const errors = [];
        Object.keys(schema.user).forEach(item =>{

            const itemSchema = schema.user[item]
            const body = req.body
            console.log(body)
            if(itemSchema.required && !body[item])
            {
                errors.push(`${itemSchema.required}`);
            }
            else
            {
                if(itemSchema.min && body[item].length < itemSchema.min){
                    errors.push(`O tamanho mínimo de ${item} é ${itemSchema.min}.`);
                }
    
                if(itemSchema.max && body[item].length > itemSchema.min){
                    errors.push(`O tamanho máximo de ${item} é ${itemSchema.max}.`);
                }
    
                if(schema.validationRegex[item] && (!new RegExp(schema.validationRegex[item].regex).test(body[item]))){
                    errors.push(`O campo ${item} está no formato incorreto!`);
                }
            }
        });
        console.log(errors)
        if(errors.length > 0) return res.status(400).json({err: errors});
        
        next();
    }

module.exports = validate;