
export default function EditProfileValidator(values) {
    let errors = {};

    if (!values.first_name) {
        errors.first_name = 'Le prénom est obligatoire';
    }
    if (/\d/.test(values.first_name)){
        errors.first_name = 'Le prénom ne peut pas contenir de chiffre'
    }
    if (!values.last_name) {
        errors.last_name = 'Le nom est obligatoire';
    }
    if (/\d/.test(values.last_name)){
        errors.last_name = 'Le nom ne peut pas contenir de chiffre'
    }

    return errors;
}