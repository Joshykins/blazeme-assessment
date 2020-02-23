
export const LoggerActionNames = { 
  LOG: "LOG"
}

export function LogAction(payload) {
  return {
    type: LoggerActionNames.LOG,
    payload
  }
}
