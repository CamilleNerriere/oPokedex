import Joi from 'joi'; 

const joiValidator = {
    validateTeam(req, res, next) {
        const {name, description} = req.body;

        const schema = Joi.object({
            name: Joi.string().min(3).required().messages({
                'string.empty': 'Le champ name ne doit pas être vide.',
                'string.min':
                        'Le name doit contenir au moins {#limit} caractères.',
                'any.required': 'Le champ name est obligatoire.',
            }),
            description: Joi.string().min(3),
        });
    
        const { error } = schema.validate({ name, description});
    
    
        if (error) {
            return next(error);
        }
    
        next();
    },
}

export {joiValidator}; 