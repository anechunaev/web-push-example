import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

const Schema = mongoose.Schema;

export interface IUserModel extends Document {
	email: string;
	password: string;
}

export default mongoose.model<IUserModel>('User', new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
}), 'Users', true);