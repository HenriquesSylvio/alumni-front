
export default function LoginValidator(values) {
    let errors = {};

    if (!values.username.trim()) {
        errors.username = 'Le prénom est obligatoire';
    }
    if (!values.password) {
        errors.password = 'Le mot de passe est obligatoire';
    }

    return errors;
}