import { mockRequest } from '../request'

export function fetchUserList() {
	return mockRequest.post('/getAllUserList')
}
