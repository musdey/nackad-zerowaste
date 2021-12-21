import type * as express from "express";

export default function createErrorHandler(): express.ErrorRequestHandler {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	return async (error: Error, req, res, next) => {
		return res.status(500).json({
			name: error.name,
			message: error.message,
		});
	};
}