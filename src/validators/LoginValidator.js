
export default function LoginValidator(values) {
    let errors = {};

    if (!values.username) {
        errors.username = 'Le nom d\'utilisateur est obligatoire';
    }
    if (!values.password) {
        errors.password = 'Le mot de passe est obligatoire';
    }

    return errors;
}