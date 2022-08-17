export default function AddPostValidator(values) {
    let errors = {};
    if (!values.title) {
        errors.title = 'Le titre est obligatoire';
    }
    if (!values.description) {
        errors.description = 'La description est obligatoire';
    }
    if (!values.date) {
        errors.date = 'La date est obligatoire';
    }
    return errors;
}