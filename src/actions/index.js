export const CREATE_MESSAGE = 'create_message';

export function createMessage(values) {
    return {
        type: CREATE_MESSAGE,
        payload: values
    };
}