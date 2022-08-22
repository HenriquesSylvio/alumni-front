export default function AddFacultyValidator(values) {
    let errors = {};
    if (!values.name) {
        errors.name = 'Le libelle de la filière est obligatoire';
    }
    return errors;
}