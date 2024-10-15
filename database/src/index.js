class DataBase {
    constructor(path) {
        this.db = false;
        this.path = !path ? "./src/database/data/data.sqlite" : path;
        this.betterSqlite3 = require("better-sqlite3");
        this.fs = require("fs");
        this.methods = {
            fetch: require("./methods/fetch.js"),
            set: require("./methods/set.js"),
            add: require("./methods/add.js"),
            subtract: require("./methods/subtract.js"),
            push: require("./methods/push.js"),
            delete: require("./methods/delete.js"),
            has: require("./methods/has.js"),
            all: require("./methods/all.js"),
            type: require("./methods/type"),
        };
        this.create();
    };

    create() {
        if (!this.db) this.db = new this.betterSqlite3(this.path);
    };

    error(content) {
        console.error(`[DATABASE: ${this.path}] => ${content}`);
        process.exit();
        return;
    }

    go(method, params, tableName) {
        const options = { table: tableName || params.ops.table || "json" };
        this.db.prepare(`CREATE TABLE IF NOT EXISTS ${options.table} (ID TEXT, json TEXT)`).run();
        if (params.ops.target && params.ops.target[0] === ".") params.ops.target = params.ops.target.slice(1);
        if (params.data && params.data === Infinity) return this.error(`You cannot put Infinity in the database {ID: ${params.id}}`);
        if (params.stringify) {
            try {
                params.data = JSON.stringify(params.data);
            } catch (e) {
                this.error(`Please provide a valid input {ID: ${params.id}}\nError Message: ${e.message}`);
            }
        };
        if (params.id && params.id.includes(".")) {
            const unparsed = params.id.split(".");
            params.id = unparsed.shift();
            params.ops.target = unparsed.join(".");
        };
        return this.methods[method](this.db, params, options);
    }

    fetch(key, ops) {
        if (!key) this.error("No key specified");
        return this.go("fetch", { id: key, ops: ops || {} });
    };

    get(key, ops) {
        if (!key) this.error("No key specified");
        return this.go("fetch", { id: key, ops: ops || {} });
    };

    set(key, value, ops) {
        if (!key) this.error("No key specified");
        if (!value) this.error("No value specified");
        return this.go("set", {
            stringify: true,
            id: key,
            data: value,
            ops: ops || {}
        });
    };

    add(key, value, ops) {
        if (!key) this.error("No key specified");
        if (isNaN(value)) this.error(`Please specify the amount to add {ID: ${key}}`);
        return this.go("add", { id: key, data: value, ops: ops || {} });
    };

    subtract(key, value, ops) {
        if (!key) this.error("No key specified");
        if (isNaN(value)) this.error(`Please specify the amount to subtract {ID: ${key}}`);
        return this.go("subtract", { id: key, data: value, ops: ops || {} });
    };

    push(key, value, ops) {
        if (!key) this.error("No key specified");
        if (!value && value != 0) this.error(`Please specify the value to add to the array {ID: ${key}}`);
        return this.go("push", {
            stringify: true,
            id: key,
            data: value,
            ops: ops || {}
        });
    };

    delete(key, ops) {
        if (!key) this.error("No key specified");
        return this.go("delete", { id: key, ops: ops || {} });
    };

    has(key, ops) {
        if (!key) this.error("No key specified");
        return this.go("has", { id: key, ops: ops || {} });
    };

    includes(key, ops) {
        if (!key) this.error("No key specified");
        return this.go("has", { id: key, ops: ops || {} });
    };

    all(ops) {
        return this.go("all", { ops: ops || {} });
    };

    fetchAll(ops) {
        return this.go("all", { ops: ops || {} });
    };

    type(key, ops) {
        if (!key) this.error("No key specified");
        return this.go("type", { id: key, ops: ops || {} });
    };
};

module.exports = DataBase;
