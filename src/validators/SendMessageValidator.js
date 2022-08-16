export default function SendMessageValidator(values) {
    let errors = {};

    if (!values.content) {
        errors.content = 'Le contenu du message est obligatoire';
    }

    return errors;
}