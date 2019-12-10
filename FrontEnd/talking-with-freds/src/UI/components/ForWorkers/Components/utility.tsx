import MessageDTO from 'common/models/DTOs/Message.dto';

export const checkUndefined = (message: MessageDTO) => {
	if (message && message.messageText) {
		return message.messageText;
	}
	return '';
};

// Set Image or Placeholder
export const setImage = (picMessage: MessageDTO, placeholderUrl: string) => {
	return checkUndefined(picMessage) === '' ? placeholderUrl : picMessage.messageText;
};
