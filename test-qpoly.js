'use strict'

var qpoly = require('./');

module.exports = {
    'isHash should identify hashes': function(t) {
        var tests = [
            [ {}, true ],
            [ {a:1}, true ],
            [ Object(), true ],
            [ new Object(), true ],

            [ /foo/i, false ],
            [ new Date(), false ],
            [ [], false ],
            [ new Array(3), false ],

            [ null, false ],
            [ undefined, false ],
            [ false, false ],
            [ new Boolean(true), false ],
            [ 1, false ],
            [ new Number(2), false ],
            [ "str", false ],
            [ new String("str2"), false ],
        ];

        for (var i=0; i<tests.length; i++) {
            t.equal(qpoly.isHash(tests[i][0]), tests[i][1], 'test ' + i + ' ' + tests[i]);
        }

        t.done();
    },

    'copyObject': {
        'should copy properties': function(t) {
            t.deepEqual(qpoly.copyObject({}), {});
            t.deepEqual(qpoly.copyObject({a:1}), {a:1});
            t.deepEqual(qpoly.copyObject({}, {a:1, b:2}), {a:1, b:2});
            t.deepEqual(qpoly.copyObject({}, {a:1}, {b:2}), {a:1, b:2});
            t.deepEqual(qpoly.copyObject({a:1}, {b:2}, {}), {a:1, b:2});
            t.deepEqual(qpoly.copyObject({a:1, b:2}, {}), {a:1, b:2});
            t.done();
        },

        'should assign the properties directly': function(t) {
            var a = { a: new Date(), b: {c:{}} };
            var b = qpoly.copyObject({}, a);
            t.deepStrictEqual(b, a);
            t.strictEqual(b.a, a.a);
            t.strictEqual(b.b, a.b);
            t.strictEqual(b.b.c, a.b.c);
            t.done();
        },

        'should omit inherited properties': function(t) {
            function C() {};
            C.prototype.x = 1;
            var a = new C();
            a.a = 1;
            t.deepEqual(qpoly.copyObject({}, a), {a:1});
            t.done();
        },
    },

    'merge': {
        'should merge all properties': function(t) {
            t.deepEqual(qpoly.merge({}), {});
            t.deepEqual(qpoly.merge({}, {}), {});
            t.deepEqual(qpoly.merge({}, {a:1}), {a:1});
            t.deepEqual(qpoly.merge({}, {a:1}, {b:2}, {c:3}), {a:1, b:2, c:3});
            t.deepEqual(qpoly.merge({}, {a: {b:2, c:3}}), {a: {b:2, c:3}});
            t.deepEqual(qpoly.merge({a: {b:1}}, {a: {b:2, c:3}}), {a: {b:2, c:3}});
            t.done();
        },

        'should not share sub-objects': function(t) {
            var a = {a:{}}, b = {a:{b:2}}, c = {a:{c:3}};
            var all = qpoly.merge(a, b, c);
            t.equal(all.a, a.a);
            t.notEqual(all.a, b.a);
            t.notEqual(all.a, c.a);
            t.done();
        },

        'should include inherited properties': function(t) {
            function C() {};
            C.prototype.x = 1;
            var a = new C();
            a.a = 1;
            t.deepEqual(qpoly.merge({}, a), {a:1, x:1});
            t.done();
        },
    },

    'fill should set array elements': function(t) {
        var arr = new Array(3);
        t.deepEqual(qpoly.fill(arr, 3), [3, 3, 3]);
        t.deepEqual(qpoly.fill(arr, 5, 2), [3, 3, 5]);
        t.deepEqual(qpoly.fill(arr, 5, 3, 5), [3, 3, 5, 5, 5]);
        t.done();
    },

    'str_repeat should repeat': function(t) {
        var tests = [
            [ "", 2, "" ],
            [ "x", 0, "" ],
            [ "ab", 1, "ab" ],
            [ "x", 2, "xx" ],
            [ "abc", 3, "abcabcabc" ],
            [ "x", 7, "xxxxxxx" ],
            [ "x", 77, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" ],

            [ 3, 3, "333" ],
            [ {}, 2, '[object Object][object Object]' ],
        ];

        for (var i=0; i<tests.length; i++) {
            t.equal(qpoly.str_repeat(tests[i][0], tests[i][1]), tests[i][2]);
        }

        t.done();
    },

    'createBuffer': {
    },

    'bufferFactory': {
    },

    'toStruct should return struct': function(t) {
        var hash = new Object({a:1});
        t.equal(qpoly.toStruct(hash), hash);
        t.done();
    },

    'varargs': {
    },

    'thunkify': {
    },

    '_invoke1': {
    },

    '_invoke2': {
    },
}
