export default app => {
    app.get("/logout", (req, res) => {
        //удалить рефреш токен из базы
        res.redirect(200, '/')
    })
}