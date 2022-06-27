
export default function EditProfileValidator(values) {
    let errors = {};

    if (!values.first_name) {
        errors.first_name = 'Le prénom est obligatoire';
    }
    if (!values.last_name) {
        errors.last_name = 'Le nom est obligatoire';
    }

    return errors;
}