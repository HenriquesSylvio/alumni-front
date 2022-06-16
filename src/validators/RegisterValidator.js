export default function RegisterValidator(values) {
    let errors = {};

    if (!values.first_name){
        errors.first_name = 'Le prénom est obligatoire'
    }
    if (!values.last_name){
        errors.last_name = 'Le nom est obligatoire'
    }
    if (!values.birthday){
        errors.birthday = 'La date de naissance est obligatoire'
    }
    if (!values.email){
        errors.email = 'L\'addresse e-mail est obligatoire'
    }
    if (!values.promo){
        errors.promo = 'La promo est obligatoire'
    }
    if (!values.username) {
        errors.username = 'Le prénom est obligatoire';
    }
    if (!values.password) {
        errors.password = 'Le mot de passe est obligatoire';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Le mot de passe de confirmation est obligatoire';
    }

    return errors;
}