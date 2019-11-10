function buildDynamicPath(app, pathCreated) {
    //Catching One Path
    app.post('/:path1', (req, res) => {
        var p = req.params;
        var path = "/" + p.path1;
        pathCreated(req, res, path);
    });

    //Catching Two Paths
    app.post('/:path1/:path2', (req, res) => {
        var p = req.params;
        var path = "/" + p.path1 + "/" + p.path2;
        pathCreated(req, res, path);
    });

    //Catching Three Paths
    app.post('/:path1/:path2/:path3', (req, res) => {
        var p = req.params;
        var path = "/" + p.path1 + "/" + p.path2 + "/" + p.path3;
        pathCreated(req, res, path);
    });

    //Catching Four Paths
    app.post('/:path1/:path2/:path3/:path4', (req, res) => {
        var p = req.params;
        var path = "/" + p.path1 + "/" + p.path2 + "/" + p.path3 + "/" + p.path4;
        pathCreated(req, res, path);
    });

    //Catching Five Paths
    app.post('/:path1/:path2/:path3/:path4/:path5', (req, res) => {
        var p = req.params;
        var path = "/" + p.path1 + "/" + p.path2 + "/" + p.path3 + "/" + p.path4 + "/" + p.path5;
        pathCreated(req, res, path);
    });

    //Catching 6 Paths
    app.post('/:path1/:path2/:path3/:path4/:path5/:path6', (req, res) => {
        var p = req.params;
        var path = "/" + p.path1 + "/" + p.path2 + "/" + p.path3 + "/" + p.path4 + "/" + p.path5 + "/" + p.path6;
        pathCreated(req, res, path);
    });

    //Catching 7 Paths
    app.post('/:path1/:path2/:path3/:path4/:path5/:path6:/:path7', (req, res) => {
        var p = req.params;
        var path = "/" + p.path1 + "/" + p.path2 + "/" + p.path3 + "/" + p.path4 + "/" + p.path5 + "/" + p.path6 + "/" + p.path7;
        pathCreated(req, res, path);
    });

    //Catching 8 Paths
    app.post('/:path1/:path2/:path3/:path4/:path5/:path6:/:path7/:path8', (req, res) => {
        var p = req.params;
        var path = "/" + p.path1 + "/" + p.path2 + "/" + p.path3 + "/" + p.path4 + "/" + p.path5 + "/" + p.path6 + "/" + p.path7 + "/" + p.path8;
        pathCreated(req, res, path);
    });

    //Catching 9 Paths
    app.post('/:path1/:path2/:path3/:path4/:path5/:path6:/:path7/:path8/:path9', (req, res) => {
        var p = req.params;
        var path = "/" + p.path1 + "/" + p.path2 + "/" + p.path3 + "/" + p.path4 + "/" + p.path5 + "/" + p.path6 + "/" + p.path7 + "/" + p.path8 + "/" + p.path9;
        pathCreated(req, res, path);
    });

    //Catching 10 Paths
    app.post('/:path1/:path2/:path3/:path4/:path5/:path6:/:path7/:path8/:path9/:path10', (req, res) => {
        var p = req.params;
        var path = "/" + p.path1 + "/" + p.path2 + "/" + p.path3 + "/" + p.path4 + "/" + p.path5 + "/" + p.path6 + "/" + p.path7 + "/" + p.path8 + "/" + p.path9 + "/" + p.path10;
        pathCreated(req, res, path);
    });

}

module.exports = buildDynamicPath;