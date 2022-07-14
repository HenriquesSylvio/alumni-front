export default function AddPostValidator(values) {
    let errors = {};
    if (!values.content) {
        errors.content = 'Le contenu du poste est obligatoire';
    }
    return errors;
}