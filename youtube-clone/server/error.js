export const createError = (status, messege) => {
    const err = new Error()
    err.status = status
    err.messege = messege

    return err
}