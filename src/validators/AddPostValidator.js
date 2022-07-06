export default function AddPostValidator(values) {
    let errors = {};

    if (!values.title) {
        errors.title = 'Le titre est obligatoire';
    }
    if (!values.content) {
        errors.content = 'Le contenu du poste est obligatoire';
    }
    if (!values.tag.id) {
        errors.tag = 'Le tag est obligatoire';
    }
    return errors;
}