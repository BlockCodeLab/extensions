// https://github.com/griffpatch/scratch-vm/blob/box2d/src/extensions/scratch3_griffpatch/index.js
(async function (Scratch) {
    const ArgumentType = Scratch.ArgumentType;
    const BlockType = Scratch.BlockType;
    // const MathUtil = require('../../util/math-util');
    // const Clone = require('../../util/clone');
    const Cast = Scratch.Cast;
    const Runtime = Scratch.Runtime;
    const formatMessage = Scratch.formatMessage;
    // const MathUtil = require('../../util/math-util');
    // const Timer = require('../../util/timer');
    // const Matter = require('matterJs/matter');
    // const Matter = require('matter-js');

    // const Box2D = require('./Box2d.min').box2d;
    const Box2D = await Scratch.require('./box2d.js');

    const RenderedTarget = {
        EVENT_TARGET_VISUAL_CHANGE: 'EVENT_TARGET_VISUAL_CHANGE',
        EVENT_TARGET_MOVED: 'TARGET_MOVED',
        ROTATION_STYLE_ALL_AROUND: 'all around'
    }

    // window.decomp = require('poly-decomp');

    const b2World = Box2D.Dynamics.b2World;
    const b2Vec2 = Box2D.Common.Math.b2Vec2;
    const b2AABB = Box2D.Collision.b2AABB;
    const b2BodyDef = Box2D.Dynamics.b2BodyDef;
    const b2Body = Box2D.Dynamics.b2Body;
    const b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    // const b2Fixture = Box2D.Dynamics.b2Fixture;
    // const b2Fixture = Box2D.Dynamics.b2Fixture;
    const b2Contact = Box2D.Dynamics.Contacts.b2Contact;
    // const b2MassData = Box2D.Collision.Shapes.b2MassData;
    const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    const b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    // const b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    const b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
    const b2Math = Box2D.Common.Math.b2Math;

    let world; let zoom;

    const fixDef = new b2FixtureDef();
    const bodyDef = new b2BodyDef();

    // const uid_seq = 0;
    // let ujidSeq = 0;

    const prevPos = {};
    /**
     * Active b2Body/s in the world.
     * @type {Object.<string,*>}
     */
    const bodies = {};
    // const joints = {};
    const pinned = {}; // Map of IDs to pinned joints
    /**
     * The runtime instantiating this block package.
     * @type {Array}
     */
    const stageBodies = [];

    // const categorySeq = 1;
    // const categories = {default: 1};

    const bodyCategoryBits = 1;
    const bodyMaskBits = 1;
    // const noCollideSeq = 0;

    const toRad = Math.PI / 180;

    // Used to record the scroll position of all sprites
    const _scroll = new b2Vec2(0, 0);

    const STAGE_TYPE_OPTIONS = {
        BOXED: 'boxed',
        FLOOR: 'floor',
        OPEN: 'open'
    };

    const SPACE_TYPE_OPTIONS = {
        WORLD: 'world',
        STAGE: 'stage',
        RELATIVE: 'relative'
    };

    const WHERE_TYPE_OPTIONS = {
        ANY: 'any',
        FEET: 'feet'
    };

    const SHAPE_TYPE_OPTIONS = {
        COSTUME: 'costume',
        CIRCLE: 'circle',
        SVG_POLYGON: 'svg',
        ALL: 'all'
    };

    const _definePolyFromHull = function (hullPoints) {
        fixDef.shape = new b2PolygonShape();

        const vertices = [];

        let prev = null;
        for (let i = hullPoints.length - 1; i >= 0; i--) {
        // for (let i = 0; i < hullPoints.length; i++) {
            const b2Vec = new b2Vec2(hullPoints[i].x / zoom, hullPoints[i].y / zoom);
            if (prev !== null && b2Math.SubtractVV(b2Vec, prev).LengthSquared() > Number.MIN_VALUE) {
                vertices.push(b2Vec);
            }
            prev = b2Vec;
        }

        fixDef.shape.SetAsArray(vertices);
    };

    const _placeBody = function (id, x, y, dir) {
        if (bodies[id]) {
            world.DestroyBody(bodies[id]);
        }

        fixDef.filter.categoryBits = bodyCategoryBits;
        fixDef.filter.maskBits = bodyMaskBits;

        bodyDef.position.x = (x + _scroll.x) / zoom;
        bodyDef.position.y = (y + _scroll.y) / zoom;
        bodyDef.angle = (90 - dir) * toRad;

        const body = world.CreateBody(bodyDef);
        body.uid = id;
        body.CreateFixture(fixDef);
        bodies[id] = body;
        return body;
    };

    const _applyForce = function (id, ftype, x, y, dir, pow) {
        const body = bodies[id];
        if (!body) {
            return;
        }

        dir = (90 - dir) * toRad;

        if (ftype === 'Impulse') {

            const center = body.GetLocalCenter(); // get the mass data from you body

            body.ApplyImpulse({x: pow * Math.cos(dir), y: pow * Math.sin(dir)},
                body.GetWorldPoint({x: (x / zoom) + center.x, y: (y / zoom) + center.y}));
        } else if (ftype === 'World Impulse') {
            body.ApplyForce({x: pow * Math.cos(dir), y: pow * Math.sin(dir)},
                {x: x / zoom, y: y / zoom});
        }
    };

    // ['', 'Define Spring Length: %n Damping: %n  Freq: %n', '_defineSpring', 100, 0.5, 8],
    const defSpring = {len: 100, damp: 0.7, freq: 5};
    const _defineSpring = function (len, damp, freq) {
        defSpring.len = len < 0.1 ? 0.1 : len / zoom;
        defSpring.damp = damp < 0 ? 0.7 : damp;
        defSpring.freq = freq > 0 ? freq : 5;
    };

    const _createJointOfType = function (jName, typ, bodyID, x, y, bodyID2, x2, y2) {

        // if (jName.length > 0) ext.destroyJoint(jName);

        if (!bodyID) bodyID = null;
        if (!bodyID2) bodyID2 = null;
        if (!bodyID && !bodyID2) {
            return null;
        }

        const body = bodyID ? bodies[bodyID] : world.GetGroundBody();
        const body2 = bodyID2 ? bodies[bodyID2] : world.GetGroundBody();

        if (!body || !body2) return null;

        let md;
        switch (typ) {
        case 'Spring':
            md = new Box2D.Dynamics.Joints.b2DistanceJointDef();
            md.length = defSpring.len;
            md.dampingRatio = defSpring.damp;
            md.frequencyHz = defSpring.freq;
            md.bodyA = body;
            md.bodyB = body2;
            md.localAnchorA = {x: x / zoom, y: y / zoom};
            md.localAnchorB = {x: x2 / zoom, y: y2 / zoom};
            break;

        case 'Rotating':
            md = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
            md.bodyA = body;
            md.bodyB = body2;
            md.localAnchorA = {x: x / zoom, y: y / zoom};
            if (x2 === null) {
                if (body2) {
                    md.localAnchorB = body2.GetLocalPoint(body.GetPosition()); // Wheel Type Joint...
                } else {
                    md.localAnchorB = body.GetWorldPoint({x: (x / zoom), y: (y / zoom)});
                }
            } else {
                md.localAnchorB = {x: x2 / zoom, y: y2 / zoom};
            }
            break;

        case 'Mouse':
            md = new b2MouseJointDef();
            if (bodyID) {
                md.bodyB = body;
                md.target.Set(x / zoom, y / zoom);
            } else {
                md.bodyB = body2;
                md.target.Set(x2 / zoom, y2 / zoom);
            }
            md.bodyA = world.GetGroundBody();
            md.collideConnected = true;
            md.maxForce = 300.0 * body.GetMass();
            break;
        }

        // md.collideConnected = true;
        // md.maxForce = 300.0 * body.GetMass();
        const joint = world.CreateJoint(md);
        if (bodyID) {
            body.SetAwake(true);
        }
        if (bodyID2) {
            body2.SetAwake(true);
        }

        // if (!jName) {
        //     ujidSeq++;
        //     jName = `_${ujidSeq}`;
        // }
        // joints[jName] = joint;
        return joint;
    };

    /**
     * Set the X and Y coordinates (No Fencing)
     * @param {!RenderedTarget} rt the renderedTarget.
     * @param {!number} x New X coordinate, in Scratch coordinates.
     * @param {!number} y New Y coordinate, in Scratch coordinates.
     * @param {?boolean} force Force setting X/Y, in case of dragging
     */
    const _setXY = function (rt, x, y, force) {
        if (rt.isStage) return;
        if (rt.dragging && !force) return;
        const oldX = rt.x;
        const oldY = rt.y;
        if (rt.renderer) {
            // const position = rt.renderer.getFencedPositionOfDrawable(rt.drawableID, [x, y]);
            rt.x = x; // position[0];
            rt.y = y; // position[1];

            rt.renderer.updateDrawableProperties(rt.drawableID, {
                position: [x, y]
            });
            if (rt.visible) {
                rt.emit(RenderedTarget.EVENT_TARGET_VISUAL_CHANGE, rt);
                rt.runtime.requestRedraw();
            }
        } else {
            rt.x = x;
            rt.y = y;
        }
        rt.emit(RenderedTarget.EVENT_TARGET_MOVED, rt, oldX, oldY, force);
        rt.runtime.requestTargetsUpdate(rt);
    };

    const createStageBody = function () {
        const body = world.CreateBody(bodyDef);
        body.CreateFixture(fixDef);
        stageBodies.push(body);
    };

    const _setStageType = function (type) {

        // Clear down previous stage
        if (stageBodies.length > 0) {
            for (const stageBodyID in stageBodies) {
                world.DestroyBody(stageBodies[stageBodyID]);
                delete stageBodies[stageBodyID];
            }
        }

        // Build up new stage
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape();
        bodyDef.angle = 0;

        if (type === STAGE_TYPE_OPTIONS.BOXED) {
            fixDef.shape.SetAsBox(250 / zoom, 10 / zoom);
            bodyDef.position.Set(0, -190 / zoom);
            createStageBody();
            bodyDef.position.Set(0, 1000 / zoom);
            createStageBody();
            fixDef.shape.SetAsBox(10 / zoom, 800 / zoom);
            bodyDef.position.Set(-250 / zoom, 540 / zoom);
            createStageBody();
            bodyDef.position.Set(250 / zoom, 540 / zoom);
            createStageBody();

        } else if (type === STAGE_TYPE_OPTIONS.FLOOR) {
            fixDef.shape.SetAsBox(5000 / zoom, 100 / zoom);
            bodyDef.position.Set(0, -280 / zoom);
            createStageBody();
            bodyDef.position.Set(-10000, -280 / zoom);
            createStageBody();
            bodyDef.position.Set(10000, -280 / zoom);
            createStageBody();
            bodyDef.position.Set(-20000, -280 / zoom);
            createStageBody();
            bodyDef.position.Set(20000, -280 / zoom);
            createStageBody();
        }

        bodyDef.type = b2Body.b2_dynamicBody;

        for (const bodyID in bodies) {
            bodies[bodyID].SetAwake(true);
        }
    };

    /**
     * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
     * @type {string}
     */
    // eslint-disable-next-line max-len
    const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiDQoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOmE9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRvYmVTVkdWaWV3ZXJFeHRlbnNpb25zLzMuMC8iDQoJIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSItMy43IC0zLjcgNDAgNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgLTMuNyAtMy43IDQwIDQwIg0KCSB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxkZWZzPg0KPC9kZWZzPg0KPHJlY3QgeD0iOC45IiB5PSIxLjUiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzE2OUZCMCIgc3Ryb2tlLXdpZHRoPSIzIiB3aWR0aD0iMTQuOCIgaGVpZ2h0PSIxNC44Ii8+DQo8cmVjdCB4PSIxLjUiIHk9IjE2LjMiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzE2OUZCMCIgc3Ryb2tlLXdpZHRoPSIzIiB3aWR0aD0iMTQuOCIgaGVpZ2h0PSIxNC44Ii8+DQo8cmVjdCB4PSIxNi4zIiB5PSIxNi4zIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMxNjlGQjAiIHN0cm9rZS13aWR0aD0iMyIgd2lkdGg9IjE0LjgiIGhlaWdodD0iMTQuOCIvPg0KPC9zdmc+';

    /**
     * Class for the music-related blocks in Scratch 3.0
     * @param {Runtime} runtime - the runtime instantiating this block package.
     * @constructor
     */
    class Scratch3Griffpatch {

        constructor () {
            /**
             * The runtime instantiating this block package.
             * @type {Runtime}
             */
            this.runtime = Scratch.vm.runtime;

            // Clear target motion state values when the project starts.
            this.runtime.on('PROJECT_START', this.reset.bind(this));
            this.runtime.on('PROJECT_STOP_ALL', this.stop.bind(this));

            world = new b2World(
                new b2Vec2(0, -10), // gravity (10)
                true // allow sleep
            );

            zoom = 50; // scale;

            this.map = {};

            fixDef.density = 1.0; // 1.0
            fixDef.friction = 0.5; // 0.5
            fixDef.restitution = 0.2; // 0.2

            _setStageType(STAGE_TYPE_OPTIONS.BOXED);
        }

        reset () {
            for (const body in bodies) {
                if (pinned[body.uid]) {
                    world.DestroyJoint(pinned[body.uid]);
                    delete pinned[body.uid];
                }
                world.DestroyBody(bodies[body]);
                delete bodies[body];
                delete prevPos[body];
            }

            // todo: delete joins?
        }

        stop () {
            if (this._simulating) {
                window.clearTimeout(this._simulating);
                this._simulating = null;
            }
        }

        /**
         * The key to load & store a target's music-related state.
         * @type {string}
         */
        static get STATE_KEY () {
            return 'Scratch.Griffpatch';
        }

        /**
         * @returns {object} metadata for this extension and its blocks.
         */
        getInfo () {
            return {
                id: 'physics',
                name: formatMessage({
                    id: 'griffpatch.categoryName',
                    default: 'Physics',
                    description: 'Label for the Griffpatch extension category'
                }),
                blockIconURI: blockIconURI,
                blocks: [
                    // Global Setup ------------------

                    {
                        opcode: 'setStage',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.setStage',
                            default: 'setup stage [stageType]',
                            description: 'Set the stage type'
                        }),
                        arguments: {
                            stageType: {
                                type: ArgumentType.STRING,
                                menu: 'StageTypes',
                                defaultValue: STAGE_TYPE_OPTIONS.BOXED
                            }
                        }
                    },
                    {
                        opcode: 'setGravity',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.setGravity',
                            default: 'set gravity to x: [gx] y: [gy]',
                            description: 'Set the gravity'
                        }),
                        arguments: {
                            gx: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            gy: {
                                type: ArgumentType.NUMBER,
                                defaultValue: -10
                            }
                        }
                    },

                    '---',

                    {
                        opcode: 'setPhysics',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.setPhysics',
                            default: 'enable for [shape] mode [mode]',
                            description: 'Enable Physics for this Sprite'
                        }),
                        arguments: {
                            shape: {
                                type: ArgumentType.STRING,
                                menu: 'ShapeTypes',
                                defaultValue: 'costume'
                            },
                            mode: {
                                type: ArgumentType.STRING,
                                menu: 'EnableModeTypes',
                                defaultValue: 'normal'
                            }
                        }
                    },
                    // {
                    //     opcode: 'setPhysics',
                    //     blockType: BlockType.COMMAND,
                    //     text: formatMessage({
                    //         id: 'griffpatch.setPhysics',
                    //         default: 'enable physics for sprite [shape]',
                    //         description: 'Enable Physics for this Sprite'
                    //     }),
                    //     arguments: {
                    //         shape: {
                    //             type: ArgumentType.STRING,
                    //             menu: 'ShapeTypes',
                    //             defaultValue: 'costume'
                    //         }
                    //     }
                    // },
                    // {
                    //     opcode: 'setPhysicsAll',
                    //     blockType: BlockType.COMMAND,
                    //     text: formatMessage({
                    //         id: 'griffpatch.setPhysicsAll',
                    //         default: 'enable physics for all sprites',
                    //         description: 'Enable Physics For All Sprites'
                    //     })
                    // },
                    
                    '---',
                    
                    {
                        opcode: 'doTick',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.doTick',
                            default: 'step simulation',
                            description: 'Run a single tick of the physics simulation'
                        })
                    },
                    {
                        opcode: 'startSimulation',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.start',
                            default: 'start simulation',
                            description: 'Run the physics simulation'
                        })
                    },

                    '---',

                    {
                        opcode: 'setPosition',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.setPosition',
                            default: 'go to x: [x] y: [y] [space]',
                            description: 'Position Sprite'
                        }),
                        arguments: {
                            x: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            y: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            space: {
                                type: ArgumentType.STRING,
                                menu: 'SpaceTypes',
                                defaultValue: 'world'
                            }
                        }
                    },


                    '---',


                    // applyForce (target, ftype, x, y, dir, pow) {
                    // applyAngForce (target, pow) {

                    {
                        opcode: 'setVelocity',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.setVelocity',
                            default: 'set velocity to x: [sx] y: [sy]',
                            description: 'Set Velocity'
                        }),
                        arguments: {
                            sx: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            sy: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'changeVelocity',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.changeVelocity',
                            default: 'change velocity by x: [sx] y: [sy]',
                            description: 'Change Velocity'
                        }),
                        arguments: {
                            sx: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            sy: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'getVelocityX',
                        text: formatMessage({
                            id: 'griffpatch.getVelocityX',
                            default: 'x velocity',
                            description: 'get the x velocity'
                        }),
                        blockType: BlockType.REPORTER
                    },
                    {
                        opcode: 'getVelocityY',
                        text: formatMessage({
                            id: 'griffpatch.getVelocityY',
                            default: 'y velocity',
                            description: 'get the y velocity'
                        }),
                        blockType: BlockType.REPORTER
                    },

                    '---',

                    {
                        opcode: 'applyForce',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.applyForce',
                            default: 'push with force [force] in direction [dir]',
                            description: 'Push this object in a given direction'
                        }),
                        arguments: {
                            force: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 25
                            },
                            dir: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'applyAngForce',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.applyAngForce',
                            default: 'spin with force [force]',
                            description: 'Push this object in a given direction'
                        }),
                        arguments: {
                            force: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 500
                            }
                        }
                    },

                    '---',

                    {
                        opcode: 'setStatic',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.setStatic',
                            default: 'set fixed [static]',
                            description: 'Sets whether this block is static or dynamic'
                        }),
                        arguments: {
                            static: {
                                type: ArgumentType.STRING,
                                menu: 'StaticTypes',
                                defaultValue: 'static'
                            }
                        }
                    },
                    // {
                    //     opcode: 'setDensity',
                    //     blockType: BlockType.COMMAND,
                    //     text: formatMessage({
                    //         id: 'griffpatch.setDensity',
                    //         default: 'set density [density]',
                    //         description: 'Set the density of the object'
                    //     }),
                    //     arguments: {
                    //         density: {
                    //             type: ArgumentType.NUMBER,
                    //             defaultValue: 1
                    //         }
                    //     }
                    // },
                    {
                        opcode: 'setProperties',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.setProperties',
                            default: 'set density [density] roughness [friction] bounce [restitution]',
                            description: 'Set the density of the object'
                        }),
                        arguments: {
                            density: {
                                type: ArgumentType.NUMBER,
                                menu: 'DensityTypes',
                                defaultValue: 100
                            },
                            friction: {
                                type: ArgumentType.NUMBER,
                                menu: 'FrictionTypes',
                                defaultValue: 50
                            },
                            restitution: {
                                type: ArgumentType.NUMBER,
                                menu: 'RestitutionTypes',
                                defaultValue: 20
                            }
                        }
                    },
                    // {
                    //     opcode: 'pinSprite',
                    //     blockType: BlockType.COMMAND,
                    //     text: formatMessage({
                    //         id: 'griffpatch.pinSprite',
                    //         default: 'pin to world at sprite\'s x: [x] y: [y]',
                    //         description: 'Pin the sprite'
                    //     }),
                    //     arguments: {
                    //         x: {
                    //             type: ArgumentType.NUMBER,
                    //             defaultValue: 0
                    //         },
                    //         y: {
                    //             type: ArgumentType.NUMBER,
                    //             defaultValue: 0
                    //         }
                    //     }
                    // },

                    '---',

                    {
                        opcode: 'getTouching',
                        text: formatMessage({
                            id: 'griffpatch.getTouching',
                            default: 'touching [where]',
                            description: 'get the name of any sprites we are touching'
                        }),
                        blockType: BlockType.REPORTER,
                        arguments: {
                            where: {
                                type: ArgumentType.STRING,
                                menu: 'WhereTypes',
                                defaultValue: 'any'
                            }
                        }
                    },

                    // Scene Scrolling -------------------

                    '---',

                    {
                        opcode: 'setScroll',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.setScroll',
                            default: 'set scroll x: [ox] y: [oy]',
                            description: 'Sets whether this block is static or dynamic'
                        }),
                        arguments: {
                            ox: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            oy: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'changeScroll',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({
                            id: 'griffpatch.changeScroll',
                            default: 'change scroll by x: [ox] y: [oy]',
                            description: 'Sets whether this block is static or dynamic'
                        }),
                        arguments: {
                            ox: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            oy: {
                                type: ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'getScrollX',
                        text: formatMessage({
                            id: 'griffpatch.getScrollX',
                            default: 'x scroll',
                            description: 'get the x scroll'
                        }),
                        blockType: BlockType.REPORTER
                    },
                    {
                        opcode: 'getScrollY',
                        text: formatMessage({
                            id: 'griffpatch.getScrollY',
                            default: 'y scroll',
                            description: 'get the y scroll'
                        }),
                        blockType: BlockType.REPORTER
                    }

                    // {
                    //     opcode: 'getStatic',
                    //     text: formatMessage({
                    //         id: 'griffpatch.getStatic',
                    //         default: 'Static?',
                    //         description: 'get whether this sprite is static'
                    //     }),
                    //     blockType: BlockType.BOOLEAN
                    // }
                ],

                menus: {
                    StageTypes: this.STAGE_TYPE_MENU,
                    SpaceTypes: this.SPACE_TYPE_MENU,
                    WhereTypes: this.WHERE_TYPE_MENU,
                    ShapeTypes: this.SHAPE_TYPE_MENU,
                    EnableModeTypes: this.ENABLE_TYPES_TYPE_MENU,
                    StaticTypes: this.STATIC_TYPE_MENU,
                    FrictionTypes: this.FRICTION_TYPE_MENU,
                    RestitutionTypes: this.RESTITUTION_TYPE_MENU,
                    DensityTypes: this.DENSITY_TYPE_MENU
                }

            };
        }

        get STAGE_TYPE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'griffpatch.menuBoxedStage',
                        default: 'boxed stage'
                    }),
                    value: STAGE_TYPE_OPTIONS.BOXED
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuOpenFloor',
                        default: 'open (with floor)'
                    }),
                    value: STAGE_TYPE_OPTIONS.FLOOR
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuOpenOnFloor',
                        default: 'open (no floor)'
                    }),
                    value: STAGE_TYPE_OPTIONS.OPEN
                },
            ];
        }

        get SPACE_TYPE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'griffpatch.menuInWorld',
                        default: 'in world'
                    }),
                    value: SPACE_TYPE_OPTIONS.WORLD
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuOnStage',
                        default: 'on stage'
                    }),
                    value: SPACE_TYPE_OPTIONS.STAGE
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuRelative',
                        default: 'relative'
                    }),
                    value: SPACE_TYPE_OPTIONS.RELATIVE
                },
            ];
        }

        get WHERE_TYPE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'griffpatch.menuAny',
                        default: 'any'
                    }),
                    value: WHERE_TYPE_OPTIONS.ANY
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuFeet',
                        default: 'feet'
                    }),
                    value: WHERE_TYPE_OPTIONS.FEET
                },
            ];
        }

        get SHAPE_TYPE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'griffpatch.menuThisCostume',
                        default: 'this costume'
                    }),
                    value: SHAPE_TYPE_OPTIONS.COSTUME
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuThisCircle',
                        default: 'this circle'
                    }),
                    value: SHAPE_TYPE_OPTIONS.CIRCLE
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuThisPolygon',
                        default: 'this polygon'
                    }),
                    value: SHAPE_TYPE_OPTIONS.SVG_POLYGON
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuAllSprites',
                        default: 'all sprites'
                    }),
                    value: SHAPE_TYPE_OPTIONS.ALL
                },
            ];
        }

        get ENABLE_TYPES_TYPE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'griffpatch.menuNormal',
                        default: 'normal'
                    }),
                    value: 'normal'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuPrecision',
                        default: 'precision'
                    }),
                    value: 'bullet'
                },
            ];
        }

        get STATIC_TYPE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'griffpatch.menuFree',
                        default: 'free'
                    }),
                    value: 'dynamic'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuFixedInPlace',
                        default: 'fixed in place'
                    }),
                    value: 'static'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuFixedCanRotate',
                        default: 'fixed (but can rotate)'
                    }),
                    value: 'pinned'
                },
            ];
        }

        get DENSITY_TYPE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'griffpatch.menuVeryLight',
                        default: 'very light'
                    }),
                    value: '25'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuLight',
                        default: 'light'
                    }),
                    value: '50'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuNormal',
                        default: 'normal'
                    }),
                    value: '100'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuHeavy',
                        default: 'heavy'
                    }),
                    value: '200'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuVeryHeavy',
                        default: 'very heavy'
                    }),
                    value: '400'
                },
            ];
        }

        get FRICTION_TYPE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'griffpatch.menuNone',
                        default: 'none'
                    }),
                    value: '0'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuSmooth',
                        default: 'smooth'
                    }),
                    value: '20'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuNormal',
                        default: 'normal'
                    }),
                    value: '50'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuRough',
                        default: 'rough'
                    }),
                    value: '75'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuExtremelyRough',
                        default: 'extremely rough'
                    }),
                    value: '100'
                },
            ];
        }

        get RESTITUTION_TYPE_MENU () {
            return [
                {
                    text: formatMessage({
                        id: 'griffpatch.menuNone',
                        default: 'none'
                    }),
                    value: '0'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuLittle',
                        default: 'little'
                    }),
                    value: '10'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuNormal',
                        default: 'normal'
                    }),
                    value: '20'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuQuiteBouncy',
                        default: 'quite bouncy'
                    }),
                    value: '40'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuVeryBouncy',
                        default: 'very bouncy'
                    }),
                    value: '70'
                },
                {
                    text: formatMessage({
                        id: 'griffpatch.menuUnstable',
                        default: 'unstable'
                    }),
                    value: '100'
                },
            ];
        }

        doTick () { // args, util) {
            // this._playDrumForBeats(args.DRUM, args.BEATS, util);
            // if (util.runtime.audioEngine === null) return;
            // if (util.target.sprite.soundBank === null) return;

            // const dx = Cast.toNumber(args.x);
            // const dy = Cast.toNumber(args.y);

            // const allTargets = this.runtime.targets;
            // if (allTargets === null) return;
            // for (let i = 0; i < allTargets.length; i++) {
            //     const target = allTargets[i];
            //     if (!target.isStage) {
            //         target.setXY(target.x + dx, target.y + dy);
            //     }
            // }

            // util.target.setXY(util.target.x + dx, util.target.y + dy);

            // Matter.Engine.update(this.engine, 1000 / 30);
            this._checkMoved();

            // world.Step(1 / 30, 10, 10);
            world.Step(1 / 30, 10, 10);
            world.ClearForces();

            for (const targetID in bodies) {
                const body = bodies[targetID];
                const target = this.runtime.getTargetById(targetID);
                if (!target) {
                    // Drop target from simulation
                    world.DestroyBody(body);
                    delete bodies[targetID];
                    delete prevPos[targetID];
                    continue;
                }

                const position = body.GetPosition();

                _setXY(target, (position.x * zoom) - _scroll.x, (position.y * zoom) - _scroll.y);
                if (target.rotationStyle === RenderedTarget.ROTATION_STYLE_ALL_AROUND) {
                    target.setDirection(90 - (body.GetAngle() / toRad));
                }

                prevPos[targetID] = {x: target.x, y: target.y, dir: target.direction};
            }
        }

        startSimulation () {
            if (!this._simulating) {
                this._simulating = window.setInterval(
                    this.doTick.bind(this),
                    this.runtime.currentStepTime
                );
            }
        }

        _checkMoved () {
            for (const targetID in bodies) {
                const body = bodies[targetID];
                const target = this.runtime.getTargetById(targetID);
                if (!target) {
                    // Drop target from simulation
                    world.DestroyBody(body);
                    delete bodies[targetID];
                    delete prevPos[targetID];
                    continue;
                }

                const prev = prevPos[targetID];
                const fixedRotation = target.rotationStyle !== RenderedTarget.ROTATION_STYLE_ALL_AROUND;

                if (prev && (prev.x !== target.x || prev.y !== target.y)) {
                    const pos = new b2Vec2((target.x + _scroll.x) / zoom, (target.y + _scroll.y) / zoom);
                    this._setPosition(body, pos);
                    if (!fixedRotation) {
                        body.SetAngle((90 - target.direction) * toRad);
                    }
                    body.SetAwake(true);
                } else if (!fixedRotation && prev && prev.dir !== target.direction) {
                    body.SetAngle((90 - target.direction) * toRad);
                    body.SetAwake(true);
                }
            }
        }

        /**
         * Play a drum sound for some number of beats.
         * @property {number} x - x offset.
         * @property {number} y - y offset.
         */
        setPhysicsAll () {

            const allTargets = this.runtime.targets;
            if (allTargets === null) return;
            for (let i = 0; i < allTargets.length; i++) {
                const target = allTargets[i];
                if (!target.isStage && !bodies[target.id]) {
                    this.setPhysicsFor(target);
                }
            }

        }

        /**
         * Play a drum sound for some number of beats.
         * @param {object} args - the block arguments.
         * @param {object} util - utility object provided by the runtime.
         * @property {string} shape - the shape
         */
        setPhysics (args, util) {
            // this._playDrumForBeats(args.DRUM, args.BEATS, util);
            // if (util.runtime.audioEngine === null) return;
            // if (util.target.sprite.soundBank === null) return;

            // const dx = Cast.toNumber(args.x);
            // const dy = Cast.toNumber(args.y);

            if (args.shape === SHAPE_TYPE_OPTIONS.ALL) {
                this.setPhysicsAll();
                return;
            }

            const target = util.target;
            const body = this.setPhysicsFor(target, args.shape);
            if (body) {
                body.SetBullet(args.mode === 'bullet');
            }
        }

        setPhysicsFor (target, shape) {
            const r = this.runtime.renderer;
            const drawable = r._allDrawables[target.drawableID];

            // Tell the Drawable about its updated convex hullPoints, if necessary.
            if (drawable.needsConvexHullPoints()) {
                const points = r._getConvexHullPointsForDrawable(target.drawableID);
                drawable.setConvexHullPoints(points);
            }

            // if (drawable._transformDirty) {
            //     drawable._calculateTransform();
            // }
            // const points = drawable._getTransformedHullPoints();
            //
            // const hullPoints = [];
            // for (const i in points) {
            //     hullPoints.push({x: points[i][0] - target.x, y: points[i][1] - target.y});
            // }

            const points = drawable._convexHullPoints;
            const scaleX = drawable.scale[0] / 100;
            const scaleY = drawable.scale[1] / -100; // Flip Y for hulls
            const offset = drawable.skin.rotationCenter;
            let allHulls = null;

            if (shape === SHAPE_TYPE_OPTIONS.CIRCLE) {
                fixDef.shape = new b2CircleShape();
                const size = drawable.skin.size;
                fixDef.shape.SetRadius((((size[0] * Math.abs(scaleX)) + (size[1] * Math.abs(scaleY))) / 4.0) / zoom);
                // fixDef.shape.SetRadius((drawable.getBounds().width / 2) / zoom);
            } else if (shape === SHAPE_TYPE_OPTIONS.SVG_POLYGON) {
                const svg = drawable._skin._svgRenderer._svgTag;

                // recurse through childNodes of type 'g', looking for type 'path'

                const hullPoints = [];
                if (svg) {
                    this._fetchPolygonPointsFromSVG(svg, hullPoints, offset[0], offset[1], scaleX, scaleY);
                }

                _definePolyFromHull(hullPoints[0]);
                allHulls = hullPoints;

            } else {
                const hullPoints = [];
                for (const i in points) {
                    hullPoints.push({x: (points[i][0] - offset[0]) * scaleX, y: (points[i][1] - offset[1]) * scaleY});
                }

                _definePolyFromHull(hullPoints);
            }

            const fixedRotation = target.rotationStyle !== RenderedTarget.ROTATION_STYLE_ALL_AROUND;
            const body = _placeBody(target.id, target.x, target.y, fixedRotation ? 90 : target.direction);
            if (target.rotationStyle !== RenderedTarget.ROTATION_STYLE_ALL_AROUND) {
                body.SetFixedRotation(true);
            }

            if (allHulls) {
                for (let i = 1; i < allHulls.length; i++) {
                    _definePolyFromHull(allHulls[i]);
                    body.CreateFixture(fixDef);
                }
            }

            return body;
        }

        /**
         *
         * @param svg the svg element
         * @param {Array} hullPointsList array of points
         * @private
         */
        _fetchPolygonPointsFromSVG (svg, hullPointsList, ox, oy, scaleX, scaleY) {
            if (svg.tagName === 'g' || svg.tagName === 'svg') {
                if (svg.hasChildNodes()) {
                    for (const node of svg.childNodes) {
                        this._fetchPolygonPointsFromSVG(node, hullPointsList, ox, oy, scaleX, scaleY);
                    }
                }
                return;
            }

            if (svg.tagName !== 'path') {
                return;
            }
            // This is it boys! Get that svg data :)
            // <path xmlns="http://www.w3.org/2000/svg" d="M 1 109.7118 L 1 1.8097 L 60.3049 38.0516 L 117.9625 1.8097 L 117.9625 109.7118 L 59.8931 73.8817 Z "
            //  data-paper-data="{&quot;origPos&quot;:null}" stroke-width="2" fill="#9966ff"/>

            let fx; let fy;

            const hullPoints = [];
            hullPointsList.push(hullPoints);

            const tokens = svg.getAttribute('d').split(' ');
            for (let i = 0; i < tokens.length;) {
                const token = tokens[i++];
                if (token === 'M' || token === 'L') {
                    const x = Cast.toNumber(tokens[i++]);
                    const y = Cast.toNumber(tokens[i++]);
                    hullPoints.push({x: (x - ox) * scaleX, y: (y - oy) * scaleY});
                    if (token === 'M') {
                        fx = x;
                        fy = y;
                    }
                }
                if (token === 'Z') {
                    hullPoints.push({x: (fx - ox) * scaleX, y: (fy - oy) * scaleY});
                }
            }
        }

        applyForce (args, util) {
            _applyForce(util.target.id, 'Impulse', 0, 0,
                Cast.toNumber(args.dir), Cast.toNumber(args.force));
        }

        applyAngForce (args, util) {
            let body = bodies[util.target.id];
            if (!body) {
                body = this.setPhysicsFor(util.target);
            }

            body.ApplyTorque(-Cast.toNumber(args.force));
        }

        setDensity (args, util) {
            let body = bodies[util.target.id];
            if (!body) {
                body = this.setPhysicsFor(util.target);
            }

            body.GetFixtureList().SetDensity(Cast.toNumber(args.density));
            body.ResetMassData();
        }

        setProperties (args, util) {
            let body = bodies[util.target.id];
            if (!body) {
                body = this.setPhysicsFor(util.target);
            }

            body.GetFixtureList().SetDensity(Cast.toNumber(args.density) / 100.0);
            body.GetFixtureList().SetFriction(Cast.toNumber(args.friction) / 100.0);
            body.GetFixtureList().SetRestitution(Cast.toNumber(args.restitution) / 100.0);
            body.ResetMassData();
        }

        pinSprite (args, util) {
            if (!bodies[util.target.id]) {
                this.setPhysicsFor(util.target);
            }

            const x = Cast.toNumber(args.x);
            const y = Cast.toNumber(args.y);

            _createJointOfType(null, 'Rotating', util.target.id, x, y, null, null, null);
        }

        /**
         * Set's the sprites position.
         * @param {object} args - the block arguments.
         * @param {object} util - utility object provided by the runtime.
         * @property {number} x - x offset.
         * @property {number} y - y offset.
         * @property {string} space - Space type (SPACE_TYPE_OPTIONS)
         */
        setPosition (args, util) {
            const x = Cast.toNumber(args.x);
            const y = Cast.toNumber(args.y);
            const body = bodies[util.target.id];

            switch (args.space) {
            case SPACE_TYPE_OPTIONS.STAGE:
                _setXY(util.target, x, y); // Position on stage (after scroll)
                if (body) {
                    this._setPosition(body, new b2Vec2((x + _scroll.x) / zoom, (y + _scroll.y) / zoom));
                }
                break;
            case SPACE_TYPE_OPTIONS.RELATIVE: {
                _setXY(util.target, util.target.x + x, util.target.x + y);
                if (body) {
                    const pos = body.GetPosition();
                    const pos2 = new b2Vec2(pos.x + (x / zoom), pos.y + (y / zoom));
                    this._setPosition(body, pos2);
                }
                break;
            }
            default:
                _setXY(util.target, x - _scroll.x, y - _scroll.y);
                if (body) {
                    this._setPosition(body, new b2Vec2(x / zoom, y / zoom));
                }
            }
        }

        _setPosition (body, pos2) {
            const md = pinned[body.uid];
            if (md) {
                world.DestroyJoint(md);
                pinned[body.uid] = _createJointOfType(null, 'Rotating', body.uid, 0, 0, null, pos2.x * zoom, pos2.y * zoom);
            }
            body.SetPosition(pos2);
            // if (md) {
            //     pinned[body.uid] = _createJointOfType(null, 'Rotating', body.uid, 0, 0, null, null, null);
            // }
        }

        /**
         * Set the sprites velocity.
         * @param {object} args - the block arguments.
         * @param {object} util - utility object provided by the runtime.
         * @property {number} sx - speed x.
         * @property {number} sy - speed y.
         */
        setVelocity (args, util) {
            let body = bodies[util.target.id];
            if (!body) {
                body = this.setPhysicsFor(util.target);
            }

            body.SetAwake(true);

            const x = Cast.toNumber(args.sx);
            const y = Cast.toNumber(args.sy);
            const force = new b2Vec2(x, y);
            force.Multiply(30 / zoom);
            body.SetLinearVelocity(force);
        }

        /**
         * Change the sprites velocity.
         * @param {object} args - the block arguments.
         * @param {object} util - utility object provided by the runtime.
         * @property {number} sx - speed x.
         * @property {number} sy - speed y.
         */
        changeVelocity (args, util) {
            let body = bodies[util.target.id];
            if (!body) {
                body = this.setPhysicsFor(util.target);
            }

            body.SetAwake(true);

            const x = Cast.toNumber(args.sx);
            const y = Cast.toNumber(args.sy);
            const force = new b2Vec2(x, y);
            force.Multiply(30 / zoom);
            force.Add(body.GetLinearVelocity());
            body.SetLinearVelocity(force);
        }

        /**
         * Get the current tempo.
         * @param {object} args - the block arguments.
         * @param {object} util - utility object provided by the runtime.
         * @return {boolean} - the current tempo, in beats per minute.
         */
        getStatic (args, util) {
            const body = bodies[util.target.id];
            if (!body) {
                return false;
            }
            const type = body.GetType();
            return type === b2Body.b2_staticBody;
        }

        /**
         * Get the current tempo.
         * @param {object} args - the block arguments.
         * @param {object} util - utility object provided by the runtime.
         * @return {number} - the current x velocity.
         */
        getVelocityX (args, util) {
            const body = bodies[util.target.id];
            if (!body) {
                return 0;
            }
            const x = body.GetLinearVelocity().x;
            return (x * zoom) / 30;
        }

        /**
         * Get the current tempo.
         * @param {object} args - the block arguments.
         * @param {object} util - utility object provided by the runtime.
         * @return {boolean} - the current y velocity.
         */
        getVelocityY (args, util) {
            const body = bodies[util.target.id];
            if (!body) {
                return 0;
            }
            const y = body.GetLinearVelocity().y;
            return (y * zoom) / 30;
        }

        /**
         * Sets the static property
         * @param {object} args - the block arguments.
         * @param {object} util - utility object provided by the runtime.
         * @property {string} static - static or not
         */
        setStatic (args, util) {
            const target = util.target;
            let body = bodies[util.target.id];
            if (!body) {
                body = this.setPhysicsFor(target);
            }
            body.SetType(args.static === 'static' ? b2Body.b2_staticBody : b2Body.b2_dynamicBody);

            const pos = new b2Vec2((target.x + _scroll.x) / zoom, (target.y + _scroll.y) / zoom);
            const fixedRotation = target.rotationStyle !== RenderedTarget.ROTATION_STYLE_ALL_AROUND;
            body.SetPositionAndAngle(pos, fixedRotation ? 0 : ((90 - target.direction) * toRad));

            if (args.static === 'pinned') {

                // Find what's behind the sprite (pin to that)
                const point = new b2AABB();
                point.lowerBound.SetV(pos);
                point.upperBound.SetV(pos);
                let body2ID = null;
                world.QueryAABB(fixture => {
                    const body2 = fixture.GetBody();
                    if (body2 !== body && fixture.TestPoint(pos.x, pos.y)){
                        body2ID = body2.uid;
                        return false;
                    }
                    return true;
                }, point);

                pinned[target.id] = _createJointOfType(null, 'Rotating', target.id, 0, 0, body2ID, null, null);
            } else {
                const pin = pinned[target.id];
                if (pin) {
                    world.DestroyJoint(pin);
                    // delete joints[pin.I];
                    delete pinned[target.id];
                }
            }
        }

        /**
         * Sets the sprite offset
         * @param {object} args - the block arguments.
         * @property {number} ox - x offset.
         * @property {number} oy - y offset.
         */
        setScroll (args) {
            this._checkMoved();
            _scroll.x = Cast.toNumber(args.ox);
            _scroll.y = Cast.toNumber(args.oy);
            this._repositionBodies();
        }

        /**
         * Sets the sprite offset
         * @param {object} args - the block arguments.
         * @property {number} ox - x offset.
         * @property {number} oy - y offset.
         */
        changeScroll (args) {
            this._checkMoved();
            _scroll.x += Cast.toNumber(args.ox);
            _scroll.y += Cast.toNumber(args.oy);
            this._repositionBodies();
        }

        /**
         * Get the scroll x.
         * @return {number} - the current x velocity.
         */
        getScrollX () {
            return _scroll.x;
        }

        /**
         * Get the scroll x.
         * @return {number} - the current x velocity.
         */
        getScrollY () {
            return _scroll.y;
        }

        _repositionBodies () {
            for (const targetID in bodies) {
                const body = bodies[targetID];
                const target = this.runtime.getTargetById(targetID);
                if (target) {
                    const position = body.GetPosition();
                    _setXY(target, (position.x * zoom) - _scroll.x, (position.y * zoom) - _scroll.y);
                    prevPos[targetID] = {x: target.x, y: target.y, dir: target.direction};
                }
            }
        }

        getTouching (args, util) {
            const target = util.target;
            const body = bodies[target.id];
            if (!body) {
                return '';
            }
            const where = args.where;
            let touching = '';
            const contacts = body.GetContactList();
            for (let ce = contacts; ce; ce = ce.next) {
                // noinspection JSBitwiseOperatorUsage
                if (ce.contact.m_flags & b2Contact.e_islandFlag) {
                    continue;
                }
                if (ce.contact.IsSensor() === true ||
                    ce.contact.IsEnabled() === false ||
                    ce.contact.IsTouching() === false) {
                    continue;
                }
                const contact = ce.contact;
                const fixtureA = contact.GetFixtureA();
                const fixtureB = contact.GetFixtureB();
                const bodyA = fixtureA.GetBody();
                const bodyB = fixtureB.GetBody();

                // const myFix = touchingB ? fixtureA : fixtureB;

                const touchingB = bodyA === body;
                if (where !== 'any') {
                    const man = new Box2D.Collision.b2WorldManifold();
                    contact.GetWorldManifold(man);
                    // man.m_points
                    // const mx = man.m_normal.x;
                    // const my = man.m_normal.y;

                    if (where === 'feet') {
                        // if (my > -0.6) {
                        //     continue;
                        // }

                        const fixture = body.GetFixtureList();
                        const y = man.m_points[0].y;
                        if (y > (fixture.m_aabb.lowerBound.y * 0.75) + (fixture.m_aabb.upperBound.y * 0.25)) {
                            continue;
                        }

                        // const lp = body.GetLocalPoint(man.m_points[0]).Normalize();
                        // if (lp.y)
                    }
                }

                const other = touchingB ? bodyB : bodyA;
                const uid = other.uid;
                const target2 = uid ? this.runtime.getTargetById(uid) : this.runtime.getTargetForStage();
                if (target2) {
                    const name = target2.sprite.name;
                    if (touching.length === 0) {
                        touching = name;
                    } else {
                        touching += `,${name}`;
                    }
                }
            }
            return touching;
        }

        /**
         * Sets the stage
         * @param {object} args - the block arguments.
         * @property {number} stageType - Stage Type.
         */
        setStage (args) {
            _setStageType(args.stageType);
        }

        /**
         * Sets the gravity
         * @param {object} args - the block arguments.
         * @property {number} gx - Gravity x.
         * @property {number} gy - Gravity y.
         */
        setGravity (args) {
            world.SetGravity(new b2Vec2(Cast.toNumber(args.gx), Cast.toNumber(args.gy)));
            for (const bodyID in bodies) {
                bodies[bodyID].SetAwake(true);
            }
        }
    }

    Scratch.extensions.register(new Scratch3Griffpatch());

    Scratch.extensions.translations({
        en: {
            'griffpatch.categoryName': 'Physics',
            'griffpatch.setStage': 'setup stage [stageType]',
            'griffpatch.setGravity': 'set gravity to x: [gx] y: [gy]',
            'griffpatch.setPhysics': 'enable for [shape] mode [mode]',
            // 'griffpatch.setPhysics': 'enable physics for sprite [shape]',
            // 'griffpatch.setPhysicsAll': 'enable physics for all sprites',
            'griffpatch.doTick': 'step simulation',
            'griffpatch.start': 'start simulation',
            'griffpatch.setPosition': 'go to x: [x] y: [y] [space]',
            'griffpatch.setVelocity': 'set velocity to x: [sx] y: [sy]',
            'griffpatch.changeVelocity': 'change velocity by x: [sx] y: [sy]',
            'griffpatch.getVelocityX': 'x velocity',
            'griffpatch.getVelocityY': 'y velocity',
            'griffpatch.applyForce': 'push with force [force] in direction [dir]',
            'griffpatch.applyAngForce': 'spin with force [force]',
            'griffpatch.setStatic': 'set fixed [static]',
            // 'griffpatch.setDensity': 'set density [density]',
            'griffpatch.setProperties': 'set density [density] roughness [friction] bounce [restitution]',
            // 'griffpatch.pinSprite': 'pin to world at sprite\'s x: [x] y: [y]',
            'griffpatch.getTouching': 'touching [where]',
            'griffpatch.setScroll': 'set scroll x: [ox] y: [oy]',
            'griffpatch.changeScroll': 'change scroll by x: [ox] y: [oy]',
            'griffpatch.getScrollX': 'x scroll',
            'griffpatch.getScrollY': 'y scroll',
            // 'griffpatch.getStatic': 'Static?',
            'griffpatch.menuBoxedStage': 'boxed stage',
            'griffpatch.menuOpenFloor': 'open (with floor)',
            'griffpatch.menuOpenOnFloor': 'open (no floor)',
            'griffpatch.menuInWorld': 'in world',
            'griffpatch.menuOnStage': 'on stage',
            'griffpatch.menuRelative': 'relative',
            'griffpatch.menuAny': 'any',
            'griffpatch.menuFeet': 'feet',
            'griffpatch.menuThisCostume': 'this costume',
            'griffpatch.menuThisCircle': 'this circle',
            'griffpatch.menuThisPolygon': 'this polygon',
            'griffpatch.menuAllSprites': 'all sprites',
            'griffpatch.menuNormal': 'normal',
            'griffpatch.menuPrecision': 'precision',
            'griffpatch.menuFree': 'free',
            'griffpatch.menuFixedInPlace': 'fixed in place',
            'griffpatch.menuFixedCanRotate': 'fixed (but can rotate)',
            'griffpatch.menuVeryLight': 'very light',
            'griffpatch.menuLight': 'light',
            'griffpatch.menuHeavy': 'heavy',
            'griffpatch.menuVeryHeavy': 'very heavy',
            'griffpatch.menuNone': 'none',
            'griffpatch.menuSmooth': 'smooth',
            'griffpatch.menuRough': 'rough',
            'griffpatch.menuExtremelyRough': 'extremely rough',
            'griffpatch.menuLittle': 'little',
            'griffpatch.menuQuiteBouncy': 'quite bouncy',
            'griffpatch.menuVeryBouncy': 'very bouncy',
            'griffpatch.menuUnstable': 'unstable'
        },
        'zh-cn': {
            'griffpatch.categoryName': '物理引擎',
            'griffpatch.setStage': '将舞台设为 [stageType]',
            'griffpatch.setGravity': '将重力设为 x: [gx] y: [gy]',
            'griffpatch.setPhysics': '以 [mode] 模式将形状设为 [shape]',
            // 'griffpatch.setPhysics': 'enable physics for sprite [shape]',
            // 'griffpatch.setPhysicsAll': 'enable physics for all sprites',
            'griffpatch.doTick': '逐步模拟',
            'griffpatch.start': '开始模拟',
            'griffpatch.setPosition': '移到 [space] 的 x: [x] y: [y]',
            'griffpatch.setVelocity': '将速度设为 x: [sx] y: [sy]',
            'griffpatch.changeVelocity': '将速度增加 x: [sx] y: [sy]',
            'griffpatch.getVelocityX': 'x 速度',
            'griffpatch.getVelocityY': 'y 速度',
            'griffpatch.applyForce': '向 [dir] 方向施加 [force] 大小的力',
            'griffpatch.applyAngForce': '施加 [force] 大小的转动力',
            'griffpatch.setStatic': '将固定模式设为 [static]',
            // 'griffpatch.setDensity': 'set density [density]',
            'griffpatch.setProperties': '将密度设为 [density] 摩擦力设为 [friction] 反弹力设为 [restitution]',
            // 'griffpatch.pinSprite': 'pin to world at sprite\'s x: [x] y: [y]',
            'griffpatch.getTouching': '[where] 碰到东西',
            'griffpatch.setScroll': '将偏移设为 x: [ox] y: [oy]',
            'griffpatch.changeScroll': '将偏移增加 x: [ox] y: [oy]',
            'griffpatch.getScrollX': 'x 偏移',
            'griffpatch.getScrollY': 'y 偏移',
            // 'griffpatch.getStatic': 'Static?',
            'griffpatch.menuBoxedStage': '有地面和墙的舞台',
            'griffpatch.menuOpenFloor': '只有地面的开放舞台',
            'griffpatch.menuOpenOnFloor': '完全开放的舞台',
            'griffpatch.menuInWorld': '世界坐标',
            'griffpatch.menuOnStage': '舞台坐标',
            'griffpatch.menuRelative': '相对坐标',
            'griffpatch.menuAny': '自己',
            'griffpatch.menuFeet': '自己下方',
            'griffpatch.menuThisCostume': '角色造型',
            'griffpatch.menuThisCircle': '圆形',
            'griffpatch.menuThisPolygon': '多边形',
            'griffpatch.menuAllSprites': '所有',
            'griffpatch.menuNormal': '普通',
            'griffpatch.menuPrecision': '精确',
            'griffpatch.menuFree': '不固定',
            'griffpatch.menuFixedInPlace': '将角色静止',
            'griffpatch.menuFixedCanRotate': '可绕固定锚点转动',
            'griffpatch.menuVeryLight': '非常轻',
            'griffpatch.menuLight': '轻',
            'griffpatch.menuHeavy': '重',
            'griffpatch.menuVeryHeavy': '非常重',
            'griffpatch.menuNone': '无',
            'griffpatch.menuSmooth': '比较光滑',
            'griffpatch.menuRough': '粗糙',
            'griffpatch.menuExtremelyRough': '极其粗糙',
            'griffpatch.menuLittle': '小',
            'griffpatch.menuQuiteBouncy': '比较有弹性',
            'griffpatch.menuVeryBouncy': '非常有弹性',
            'griffpatch.menuUnstable': '极其易变形'
        },
        'zh-tw': {
            'griffpatch.categoryName': '物理引擎',
            'griffpatch.setStage': '將舞臺設為 [stageType]',
            'griffpatch.setGravity': '將重力設為 x: [gx] y: [gy]',
            'griffpatch.setPhysics': '以 [mode] 模式將形狀設為 [shape]',
            // 'griffpatch.setPhysics': 'enable physics for sprite [shape]',
            // 'griffpatch.setPhysicsAll': 'enable physics for all sprites',
            'griffpatch.doTick': '逐步模擬',
            'griffpatch.start': '開始模擬',
            'griffpatch.setPosition': '移到 [space] 的 x: [x] y: [y]',
            'griffpatch.setVelocity': '將速度設為 x: [sx] y: [sy]',
            'griffpatch.changeVelocity': '將速度增加 x: [sx] y: [sy]',
            'griffpatch.getVelocityX': 'x 速度',
            'griffpatch.getVelocityY': 'y 速度',
            'griffpatch.applyForce': '向 [dir] 方向施加 [force] 大小的力',
            'griffpatch.applyAngForce': '施加 [force] 大小的轉動力',
            'griffpatch.setStatic': '將固定模式設為 [static]',
            // 'griffpatch.setDensity': 'set density [density]',
            'griffpatch.setProperties': '將密度設為 [density] 摩擦力設為 [friction] 反彈力設為 [restitution]',
            // 'griffpatch.pinSprite': 'pin to world at sprite\'s x: [x] y: [y]',
            'griffpatch.getTouching': '[where] 碰到東西',
            'griffpatch.setScroll': '將偏移設為 x: [ox] y: [oy]',
            'griffpatch.changeScroll': '將偏移增加 x: [ox] y: [oy]',
            'griffpatch.getScrollX': 'x 偏移',
            'griffpatch.getScrollY': 'y 偏移',
            // 'griffpatch.getStatic': 'Static?',
            'griffpatch.menuBoxedStage': '有地面和牆的舞臺',
            'griffpatch.menuOpenFloor': '只有地面的開放舞臺',
            'griffpatch.menuOpenOnFloor': '完全開放的舞臺',
            'griffpatch.menuInWorld': '世界座標',
            'griffpatch.menuOnStage': '舞臺座標',
            'griffpatch.menuRelative': '相對座標',
            'griffpatch.menuAny': '自己',
            'griffpatch.menuFeet': '自己下方',
            'griffpatch.menuThisCostume': '角色造型',
            'griffpatch.menuThisCircle': '圓形',
            'griffpatch.menuThisPolygon': '多邊形',
            'griffpatch.menuAllSprites': '所有',
            'griffpatch.menuNormal': '普通',
            'griffpatch.menuPrecision': '精確',
            'griffpatch.menuFree': '不固定',
            'griffpatch.menuFixedInPlace': '將角色靜止',
            'griffpatch.menuFixedCanRotate': '可繞固定錨點轉動',
            'griffpatch.menuVeryLight': '非常輕',
            'griffpatch.menuLight': '輕',
            'griffpatch.menuHeavy': '重',
            'griffpatch.menuVeryHeavy': '非常重',
            'griffpatch.menuNone': '無',
            'griffpatch.menuSmooth': '比較光滑',
            'griffpatch.menuRough': '粗糙',
            'griffpatch.menuExtremelyRough': '極其粗糙',
            'griffpatch.menuLittle': '小',
            'griffpatch.menuQuiteBouncy': '比較有彈性',
            'griffpatch.menuVeryBouncy': '非常有彈性',
            'griffpatch.menuUnstable': '極其易變形'
        }
    });
})(window.Scratch);
