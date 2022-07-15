export default function AddPostValidator(values) {
    let errors = {};
    if (!values.content) {
        errors.content = 'Le contenu est obligatoire';
    }
    return errors;
}