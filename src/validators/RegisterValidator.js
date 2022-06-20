export default function RegisterValidator(values) {
    let errors = {};

    if (!values.first_name){
        errors.first_name = 'Le prénom est obligatoire'
    }
    if (!values.last_name){
        errors.last_name = 'Le nom est obligatoire'
    }
    if (!values.email){
        errors.email = 'L\'addresse e-mail est obligatoire'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'L\'email est invalide.';
    }

    if (!values.promo){
        errors.promo = 'La promo est obligatoire.'
    }
    if (!values.username) {
        errors.username = 'Le prénom est obligatoire.';
    }
    if (!values.password) {
        errors.password = 'Le mot de passe est obligatoire.';
    } else if (values.password.length < 8) {
        errors.password = 'Le mot de passe doit contenir un minimum de 8 caractères';
    } else if (values.password.length > 20) {
        errors.password = 'Le mot de passe doit contenir un maximum de 20 caractères';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/.test(values.password)){
        errors.password = 'Les mots de passe doivent contenir au moins 8 caractères et contenir au moins une des catégories suivantes : majuscules, minuscules, chiffres et symboles.';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Le mot de passe de confirmation est obligatoire.';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Le mot de passe et le mot de passe de confirmation ne correspondent pas. Veuillez réessayer.';
    }

    return errors;
}