!async function(){const e=Scratch.ArgumentType,t=Scratch.BlockType,h=Scratch.Cast;Scratch.Runtime;const i=Scratch.formatMessage,u=await Scratch.require("./box2d.js"),g={EVENT_TARGET_VISUAL_CHANGE:"EVENT_TARGET_VISUAL_CHANGE",EVENT_TARGET_MOVED:"TARGET_MOVED",ROTATION_STYLE_ALL_AROUND:"all around"},a=u.Dynamics.b2World,n=u.Common.Math.b2Vec2,c=u.Collision.b2AABB;var r=u.Dynamics.b2BodyDef;const s=u.Dynamics.b2Body;var o=u.Dynamics.b2FixtureDef;const l=u.Dynamics.Contacts.b2Contact,f=u.Collision.Shapes.b2PolygonShape,p=u.Collision.Shapes.b2CircleShape,y=u.Dynamics.Joints.b2MouseJointDef,L=u.Common.Math.b2Math;let d,m;function x(t){S.shape=new f;var i=[];let a=null;for(let e=t.length-1;0<=e;e--){var r=new n(t[e].x/m,t[e].y/m);null!==a&&L.SubtractVV(r,a).LengthSquared()>Number.MIN_VALUE&&i.push(r),a=r}S.shape.SetAsArray(i)}function D(e,t,i,a){return N[e]&&d.DestroyBody(N[e]),S.filter.categoryBits=1,S.filter.maskBits=1,T.position.x=(t+A.x)/m,T.position.y=(i+A.y)/m,T.angle=(90-a)*v,(t=d.CreateBody(T)).uid=e,t.CreateFixture(S),N[e]=t}function F(e,t,i,a,r,o){var n;(e=N[e])&&(r=(90-r)*v,"Impulse"===t?(n=e.GetLocalCenter(),e.ApplyImpulse({x:o*Math.cos(r),y:o*Math.sin(r)},e.GetWorldPoint({x:i/m+n.x,y:a/m+n.y}))):"World Impulse"===t&&e.ApplyForce({x:o*Math.cos(r),y:o*Math.sin(r)},{x:i/m,y:a/m}))}const S=new o,T=new r,E={},N={},b={},P=[],v=Math.PI/180,A=new n(0,0),R={BOXED:"boxed",FLOOR:"floor",OPEN:"open"},I={WORLD:"world",STAGE:"stage",RELATIVE:"relative"},M={ANY:"any",FEET:"feet"},_={COSTUME:"costume",CIRCLE:"circle",SVG_POLYGON:"svg",ALL:"all"},B={len:100,damp:.7,freq:5};function V(e,t,i,a,r,o,n,c){if(o=o||null,!(i=i||null)&&!o)return null;var s=i?N[i]:d.GetGroundBody(),f=o?N[o]:d.GetGroundBody();if(!s||!f)return null;let l;switch(t){case"Spring":(l=new u.Dynamics.Joints.b2DistanceJointDef).length=B.len,l.dampingRatio=B.damp,l.frequencyHz=B.freq,l.bodyA=s,l.bodyB=f,l.localAnchorA={x:a/m,y:r/m},l.localAnchorB={x:n/m,y:c/m};break;case"Rotating":(l=new u.Dynamics.Joints.b2RevoluteJointDef).bodyA=s,l.bodyB=f,l.localAnchorA={x:a/m,y:r/m},l.localAnchorB=null===n?f?f.GetLocalPoint(s.GetPosition()):s.GetWorldPoint({x:a/m,y:r/m}):{x:n/m,y:c/m};break;case"Mouse":l=new y,i?(l.bodyB=s,l.target.Set(a/m,r/m)):(l.bodyB=f,l.target.Set(n/m,c/m)),l.bodyA=d.GetGroundBody(),l.collideConnected=!0,l.maxForce=300*s.GetMass()}return t=d.CreateJoint(l),i&&s.SetAwake(!0),o&&f.SetAwake(!0),t}function O(e,t,i,a){var r,o;e.isStage||e.dragging&&!a||(r=e.x,o=e.y,e.renderer?(e.x=t,e.y=i,e.renderer.updateDrawableProperties(e.drawableID,{position:[t,i]}),e.visible&&(e.emit(g.EVENT_TARGET_VISUAL_CHANGE,e),e.runtime.requestRedraw())):(e.x=t,e.y=i),e.emit(g.EVENT_TARGET_MOVED,e,r,o,a),e.runtime.requestTargetsUpdate(e))}function G(){var e=d.CreateBody(T);e.CreateFixture(S),P.push(e)}function C(e){if(0<P.length)for(const t in P)d.DestroyBody(P[t]),delete P[t];T.type=s.b2_staticBody,S.shape=new f,T.angle=0,e===R.BOXED?(S.shape.SetAsBox(250/m,10/m),T.position.Set(0,-190/m),G(),T.position.Set(0,1e3/m),G(),S.shape.SetAsBox(10/m,800/m),T.position.Set(-250/m,540/m),G(),T.position.Set(250/m,540/m),G()):e===R.FLOOR&&(S.shape.SetAsBox(5e3/m,100/m),T.position.Set(0,-280/m),G(),T.position.Set(-1e4,-280/m),G(),T.position.Set(1e4,-280/m),G(),T.position.Set(-2e4,-280/m),G(),T.position.Set(2e4,-280/m),G()),T.type=s.b2_dynamicBody;for(const i in N)N[i].SetAwake(!0)}Scratch.extensions.register(new class{constructor(){this.runtime=Scratch.vm.runtime,this.runtime.on("PROJECT_START",this.reset.bind(this)),this.runtime.on("PROJECT_STOP_ALL",this.stop.bind(this)),d=new a(new n(0,-10),!0),m=50,this.map={},S.density=1,S.friction=.5,S.restitution=.2,C(R.BOXED)}reset(){for(const e in N)b[e.uid]&&(d.DestroyJoint(b[e.uid]),delete b[e.uid]),d.DestroyBody(N[e]),delete N[e],delete E[e]}stop(){this._simulating&&(window.clearTimeout(this._simulating),this._simulating=null)}static get STATE_KEY(){return"Scratch.Griffpatch"}getInfo(){return{id:"physics",name:i({id:"griffpatch.categoryName",default:"Physics",description:"Label for the Griffpatch extension category"}),blockIconURI:"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiDQoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOmE9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRvYmVTVkdWaWV3ZXJFeHRlbnNpb25zLzMuMC8iDQoJIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSItMy43IC0zLjcgNDAgNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgLTMuNyAtMy43IDQwIDQwIg0KCSB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxkZWZzPg0KPC9kZWZzPg0KPHJlY3QgeD0iOC45IiB5PSIxLjUiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzE2OUZCMCIgc3Ryb2tlLXdpZHRoPSIzIiB3aWR0aD0iMTQuOCIgaGVpZ2h0PSIxNC44Ii8+DQo8cmVjdCB4PSIxLjUiIHk9IjE2LjMiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzE2OUZCMCIgc3Ryb2tlLXdpZHRoPSIzIiB3aWR0aD0iMTQuOCIgaGVpZ2h0PSIxNC44Ii8+DQo8cmVjdCB4PSIxNi4zIiB5PSIxNi4zIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMxNjlGQjAiIHN0cm9rZS13aWR0aD0iMyIgd2lkdGg9IjE0LjgiIGhlaWdodD0iMTQuOCIvPg0KPC9zdmc+",blocks:[{opcode:"setStage",blockType:t.COMMAND,text:i({id:"griffpatch.setStage",default:"setup stage [stageType]",description:"Set the stage type"}),arguments:{stageType:{type:e.STRING,menu:"StageTypes",defaultValue:R.BOXED}}},{opcode:"setGravity",blockType:t.COMMAND,text:i({id:"griffpatch.setGravity",default:"set gravity to x: [gx] y: [gy]",description:"Set the gravity"}),arguments:{gx:{type:e.NUMBER,defaultValue:0},gy:{type:e.NUMBER,defaultValue:-10}}},"---",{opcode:"setPhysics",blockType:t.COMMAND,text:i({id:"griffpatch.setPhysics",default:"enable for [shape] mode [mode]",description:"Enable Physics for this Sprite"}),arguments:{shape:{type:e.STRING,menu:"ShapeTypes",defaultValue:"costume"},mode:{type:e.STRING,menu:"EnableModeTypes",defaultValue:"normal"}}},"---",{opcode:"doTick",blockType:t.COMMAND,text:i({id:"griffpatch.doTick",default:"step simulation",description:"Run a single tick of the physics simulation"})},{opcode:"startSimulation",blockType:t.COMMAND,text:i({id:"griffpatch.start",default:"start simulation",description:"Run the physics simulation"})},"---",{opcode:"setPosition",blockType:t.COMMAND,text:i({id:"griffpatch.setPosition",default:"go to x: [x] y: [y] [space]",description:"Position Sprite"}),arguments:{x:{type:e.NUMBER,defaultValue:0},y:{type:e.NUMBER,defaultValue:0},space:{type:e.STRING,menu:"SpaceTypes",defaultValue:"world"}}},"---",{opcode:"setVelocity",blockType:t.COMMAND,text:i({id:"griffpatch.setVelocity",default:"set velocity to x: [sx] y: [sy]",description:"Set Velocity"}),arguments:{sx:{type:e.NUMBER,defaultValue:0},sy:{type:e.NUMBER,defaultValue:0}}},{opcode:"changeVelocity",blockType:t.COMMAND,text:i({id:"griffpatch.changeVelocity",default:"change velocity by x: [sx] y: [sy]",description:"Change Velocity"}),arguments:{sx:{type:e.NUMBER,defaultValue:0},sy:{type:e.NUMBER,defaultValue:0}}},{opcode:"getVelocityX",text:i({id:"griffpatch.getVelocityX",default:"x velocity",description:"get the x velocity"}),blockType:t.REPORTER},{opcode:"getVelocityY",text:i({id:"griffpatch.getVelocityY",default:"y velocity",description:"get the y velocity"}),blockType:t.REPORTER},"---",{opcode:"applyForce",blockType:t.COMMAND,text:i({id:"griffpatch.applyForce",default:"push with force [force] in direction [dir]",description:"Push this object in a given direction"}),arguments:{force:{type:e.NUMBER,defaultValue:25},dir:{type:e.NUMBER,defaultValue:0}}},{opcode:"applyAngForce",blockType:t.COMMAND,text:i({id:"griffpatch.applyAngForce",default:"spin with force [force]",description:"Push this object in a given direction"}),arguments:{force:{type:e.NUMBER,defaultValue:500}}},"---",{opcode:"setStatic",blockType:t.COMMAND,text:i({id:"griffpatch.setStatic",default:"set fixed [static]",description:"Sets whether this block is static or dynamic"}),arguments:{static:{type:e.STRING,menu:"StaticTypes",defaultValue:"static"}}},{opcode:"setProperties",blockType:t.COMMAND,text:i({id:"griffpatch.setProperties",default:"set density [density] roughness [friction] bounce [restitution]",description:"Set the density of the object"}),arguments:{density:{type:e.NUMBER,menu:"DensityTypes",defaultValue:100},friction:{type:e.NUMBER,menu:"FrictionTypes",defaultValue:50},restitution:{type:e.NUMBER,menu:"RestitutionTypes",defaultValue:20}}},"---",{opcode:"getTouching",text:i({id:"griffpatch.getTouching",default:"touching [where]",description:"get the name of any sprites we are touching"}),blockType:t.REPORTER,arguments:{where:{type:e.STRING,menu:"WhereTypes",defaultValue:"any"}}},"---",{opcode:"setScroll",blockType:t.COMMAND,text:i({id:"griffpatch.setScroll",default:"set scroll x: [ox] y: [oy]",description:"Sets whether this block is static or dynamic"}),arguments:{ox:{type:e.NUMBER,defaultValue:0},oy:{type:e.NUMBER,defaultValue:0}}},{opcode:"changeScroll",blockType:t.COMMAND,text:i({id:"griffpatch.changeScroll",default:"change scroll by x: [ox] y: [oy]",description:"Sets whether this block is static or dynamic"}),arguments:{ox:{type:e.NUMBER,defaultValue:0},oy:{type:e.NUMBER,defaultValue:0}}},{opcode:"getScrollX",text:i({id:"griffpatch.getScrollX",default:"x scroll",description:"get the x scroll"}),blockType:t.REPORTER},{opcode:"getScrollY",text:i({id:"griffpatch.getScrollY",default:"y scroll",description:"get the y scroll"}),blockType:t.REPORTER}],menus:{StageTypes:this.STAGE_TYPE_MENU,SpaceTypes:this.SPACE_TYPE_MENU,WhereTypes:this.WHERE_TYPE_MENU,ShapeTypes:this.SHAPE_TYPE_MENU,EnableModeTypes:this.ENABLE_TYPES_TYPE_MENU,StaticTypes:this.STATIC_TYPE_MENU,FrictionTypes:this.FRICTION_TYPE_MENU,RestitutionTypes:this.RESTITUTION_TYPE_MENU,DensityTypes:this.DENSITY_TYPE_MENU}}}get STAGE_TYPE_MENU(){return[{text:i({id:"griffpatch.menuBoxedStage",default:"boxed stage"}),value:R.BOXED},{text:i({id:"griffpatch.menuOpenFloor",default:"open (with floor)"}),value:R.FLOOR},{text:i({id:"griffpatch.menuOpenOnFloor",default:"open (no floor)"}),value:R.OPEN}]}get SPACE_TYPE_MENU(){return[{text:i({id:"griffpatch.menuInWorld",default:"in world"}),value:I.WORLD},{text:i({id:"griffpatch.menuOnStage",default:"on stage"}),value:I.STAGE},{text:i({id:"griffpatch.menuRelative",default:"relative"}),value:I.RELATIVE}]}get WHERE_TYPE_MENU(){return[{text:i({id:"griffpatch.menuAny",default:"any"}),value:M.ANY},{text:i({id:"griffpatch.menuFeet",default:"feet"}),value:M.FEET}]}get SHAPE_TYPE_MENU(){return[{text:i({id:"griffpatch.menuThisCostume",default:"this costume"}),value:_.COSTUME},{text:i({id:"griffpatch.menuThisCircle",default:"this circle"}),value:_.CIRCLE},{text:i({id:"griffpatch.menuThisPolygon",default:"this polygon"}),value:_.SVG_POLYGON},{text:i({id:"griffpatch.menuAllSprites",default:"all sprites"}),value:_.ALL}]}get ENABLE_TYPES_TYPE_MENU(){return[{text:i({id:"griffpatch.menuNormal",default:"normal"}),value:"normal"},{text:i({id:"griffpatch.menuPrecision",default:"precision"}),value:"bullet"}]}get STATIC_TYPE_MENU(){return[{text:i({id:"griffpatch.menuFree",default:"free"}),value:"dynamic"},{text:i({id:"griffpatch.menuFixedInPlace",default:"fixed in place"}),value:"static"},{text:i({id:"griffpatch.menuFixedCanRotate",default:"fixed (but can rotate)"}),value:"pinned"}]}get DENSITY_TYPE_MENU(){return[{text:i({id:"griffpatch.menuVeryLight",default:"very light"}),value:"25"},{text:i({id:"griffpatch.menuLight",default:"light"}),value:"50"},{text:i({id:"griffpatch.menuNormal",default:"normal"}),value:"100"},{text:i({id:"griffpatch.menuHeavy",default:"heavy"}),value:"200"},{text:i({id:"griffpatch.menuVeryHeavy",default:"very heavy"}),value:"400"}]}get FRICTION_TYPE_MENU(){return[{text:i({id:"griffpatch.menuNone",default:"none"}),value:"0"},{text:i({id:"griffpatch.menuSmooth",default:"smooth"}),value:"20"},{text:i({id:"griffpatch.menuNormal",default:"normal"}),value:"50"},{text:i({id:"griffpatch.menuRough",default:"rough"}),value:"75"},{text:i({id:"griffpatch.menuExtremelyRough",default:"extremely rough"}),value:"100"}]}get RESTITUTION_TYPE_MENU(){return[{text:i({id:"griffpatch.menuNone",default:"none"}),value:"0"},{text:i({id:"griffpatch.menuLittle",default:"little"}),value:"10"},{text:i({id:"griffpatch.menuNormal",default:"normal"}),value:"20"},{text:i({id:"griffpatch.menuQuiteBouncy",default:"quite bouncy"}),value:"40"},{text:i({id:"griffpatch.menuVeryBouncy",default:"very bouncy"}),value:"70"},{text:i({id:"griffpatch.menuUnstable",default:"unstable"}),value:"100"}]}doTick(){this._checkMoved(),d.Step(1/30,10,10),d.ClearForces();for(const a in N){var e,t=N[a],i=this.runtime.getTargetById(a);i?(e=t.GetPosition(),O(i,e.x*m-A.x,e.y*m-A.y),i.rotationStyle===g.ROTATION_STYLE_ALL_AROUND&&i.setDirection(90-t.GetAngle()/v),E[a]={x:i.x,y:i.y,dir:i.direction}):(d.DestroyBody(t),delete N[a],delete E[a])}}startSimulation(){this._simulating||(this._simulating=window.setInterval(this.doTick.bind(this),this.runtime.currentStepTime))}_checkMoved(){for(const r in N){var e,t,i=N[r],a=this.runtime.getTargetById(r);a?(t=E[r],e=a.rotationStyle!==g.ROTATION_STYLE_ALL_AROUND,!t||t.x===a.x&&t.y===a.y?!e&&t&&t.dir!==a.direction&&(i.SetAngle((90-a.direction)*v),i.SetAwake(!0)):(t=new n((a.x+A.x)/m,(a.y+A.y)/m),this._setPosition(i,t),e||i.SetAngle((90-a.direction)*v),i.SetAwake(!0))):(d.DestroyBody(i),delete N[r],delete E[r])}}setPhysicsAll(){var t=this.runtime.targets;if(null!==t)for(let e=0;e<t.length;e++){var i=t[e];i.isStage||N[i.id]||this.setPhysicsFor(i)}}setPhysics(e,t){e.shape===_.ALL?this.setPhysicsAll():(t=t.target,(t=this.setPhysicsFor(t,e.shape))&&t.SetBullet("bullet"===e.mode))}setPhysicsFor(e,t){var i=this.runtime.renderer,a=i._allDrawables[e.drawableID];if(a.needsConvexHullPoints()){const r=i._getConvexHullPointsForDrawable(e.drawableID);a.setConvexHullPoints(r)}const r=a._convexHullPoints;var o=a.scale[0]/100,n=a.scale[1]/-100,c=a.skin.rotationCenter;let s=null;if(t===_.CIRCLE){S.shape=new p;i=a.skin.size;S.shape.SetRadius((i[0]*Math.abs(o)+i[1]*Math.abs(n))/4/m)}else if(t===_.SVG_POLYGON){i=a._skin._svgRenderer._svgTag,t=[];i&&this._fetchPolygonPointsFromSVG(i,t,c[0],c[1],o,n),x(t[0]),s=t}else{var f=[];for(const u in r)f.push({x:(r[u][0]-c[0])*o,y:(r[u][1]-c[1])*n});x(f)}var a=e.rotationStyle!==g.ROTATION_STYLE_ALL_AROUND,l=D(e.id,e.x,e.y,a?90:e.direction);if(e.rotationStyle!==g.ROTATION_STYLE_ALL_AROUND&&l.SetFixedRotation(!0),s)for(let e=1;e<s.length;e++)x(s[e]),l.CreateFixture(S);return l}_fetchPolygonPointsFromSVG(e,a,r,o,n,c){if("g"===e.tagName||"svg"===e.tagName){if(e.hasChildNodes())for(const t of e.childNodes)this._fetchPolygonPointsFromSVG(t,a,r,o,n,c)}else if("path"===e.tagName){let t,i;var s=[],f=(a.push(s),e.getAttribute("d").split(" "));for(let e=0;e<f.length;){var l,u,g=f[e++];"M"!==g&&"L"!==g||(l=h.toNumber(f[e++]),u=h.toNumber(f[e++]),s.push({x:(l-r)*n,y:(u-o)*c}),"M"===g&&(t=l,i=u)),"Z"===g&&s.push({x:(t-r)*n,y:(i-o)*c})}}}applyForce(e,t){F(t.target.id,"Impulse",0,0,h.toNumber(e.dir),h.toNumber(e.force))}applyAngForce(e,t){let i=N[t.target.id];(i=i||this.setPhysicsFor(t.target)).ApplyTorque(-h.toNumber(e.force))}setDensity(e,t){let i=N[t.target.id];(i=i||this.setPhysicsFor(t.target)).GetFixtureList().SetDensity(h.toNumber(e.density)),i.ResetMassData()}setProperties(e,t){let i=N[t.target.id];(i=i||this.setPhysicsFor(t.target)).GetFixtureList().SetDensity(h.toNumber(e.density)/100),i.GetFixtureList().SetFriction(h.toNumber(e.friction)/100),i.GetFixtureList().SetRestitution(h.toNumber(e.restitution)/100),i.ResetMassData()}pinSprite(e,t){N[t.target.id]||this.setPhysicsFor(t.target);var i=h.toNumber(e.x),e=h.toNumber(e.y);V(0,"Rotating",t.target.id,i,e,null,null,null)}setPosition(e,t){var i,a=h.toNumber(e.x),r=h.toNumber(e.y),o=N[t.target.id];switch(e.space){case I.STAGE:O(t.target,a,r),o&&this._setPosition(o,new n((a+A.x)/m,(r+A.y)/m));break;case I.RELATIVE:O(t.target,t.target.x+a,t.target.x+r),o&&(i=o.GetPosition(),i=new n(i.x+a/m,i.y+r/m),this._setPosition(o,i));break;default:O(t.target,a-A.x,r-A.y),o&&this._setPosition(o,new n(a/m,r/m))}}_setPosition(e,t){var i=b[e.uid];i&&(d.DestroyJoint(i),b[e.uid]=V(0,"Rotating",e.uid,0,0,null,t.x*m,t.y*m)),e.SetPosition(t)}setVelocity(e,t){let i=N[t.target.id];(i=i||this.setPhysicsFor(t.target)).SetAwake(!0);t=h.toNumber(e.sx),e=h.toNumber(e.sy),t=new n(t,e);t.Multiply(30/m),i.SetLinearVelocity(t)}changeVelocity(e,t){let i=N[t.target.id];(i=i||this.setPhysicsFor(t.target)).SetAwake(!0);t=h.toNumber(e.sx),e=h.toNumber(e.sy),t=new n(t,e);t.Multiply(30/m),t.Add(i.GetLinearVelocity()),i.SetLinearVelocity(t)}getStatic(e,t){t=N[t.target.id];return!!t&&t.GetType()===s.b2_staticBody}getVelocityX(e,t){t=N[t.target.id];return t?t.GetLinearVelocity().x*m/30:0}getVelocityY(e,t){t=N[t.target.id];return t?t.GetLinearVelocity().y*m/30:0}setStatic(e,t){var a=t.target;let r=N[t.target.id];(r=r||this.setPhysicsFor(a)).SetType("static"===e.static?s.b2_staticBody:s.b2_dynamicBody);const o=new n((a.x+A.x)/m,(a.y+A.y)/m);t=a.rotationStyle!==g.ROTATION_STYLE_ALL_AROUND;if(r.SetPositionAndAngle(o,t?0:(90-a.direction)*v),"pinned"===e.static){t=new c;t.lowerBound.SetV(o),t.upperBound.SetV(o);let i=null;d.QueryAABB(e=>{var t=e.GetBody();return t===r||!e.TestPoint(o.x,o.y)||(i=t.uid,!1)},t),b[a.id]=V(0,"Rotating",a.id,0,0,i,null,null)}else{e=b[a.id];e&&(d.DestroyJoint(e),delete b[a.id])}}setScroll(e){this._checkMoved(),A.x=h.toNumber(e.ox),A.y=h.toNumber(e.oy),this._repositionBodies()}changeScroll(e){this._checkMoved(),A.x+=h.toNumber(e.ox),A.y+=h.toNumber(e.oy),this._repositionBodies()}getScrollX(){return A.x}getScrollY(){return A.y}_repositionBodies(){for(const i in N){var e=N[i],t=this.runtime.getTargetById(i);t&&(e=e.GetPosition(),O(t,e.x*m-A.x,e.y*m-A.y),E[i]={x:t.x,y:t.y,dir:t.direction})}}getTouching(e,t){var t=t.target,i=N[t.id];if(!i)return"";var a=e.where;let r="";for(let e=i.GetContactList();e;e=e.next)if(!(e.contact.m_flags&l.e_islandFlag)&&!0!==e.contact.IsSensor()&&!1!==e.contact.IsEnabled()&&!1!==e.contact.IsTouching()){var o=e.contact,n=o.GetFixtureA(),c=o.GetFixtureB(),n=n.GetBody(),c=c.GetBody(),s=n===i;if("any"!==a){var f=new u.Collision.b2WorldManifold;if(o.GetWorldManifold(f),"feet"===a){o=i.GetFixtureList();if(f.m_points[0].y>.75*o.m_aabb.lowerBound.y+.25*o.m_aabb.upperBound.y)continue}}f=(s?c:n).uid,o=f?this.runtime.getTargetById(f):this.runtime.getTargetForStage();o&&(s=o.sprite.name,0===r.length?r=s:r+=","+s)}return r}setStage(e){C(e.stageType)}setGravity(e){d.SetGravity(new n(h.toNumber(e.gx),h.toNumber(e.gy)));for(const t in N)N[t].SetAwake(!0)}}),Scratch.extensions.translations({en:{"griffpatch.categoryName":"Physics","griffpatch.setStage":"setup stage [stageType]","griffpatch.setGravity":"set gravity to x: [gx] y: [gy]","griffpatch.setPhysics":"enable for [shape] mode [mode]","griffpatch.doTick":"step simulation","griffpatch.start":"start simulation","griffpatch.setPosition":"go to x: [x] y: [y] [space]","griffpatch.setVelocity":"set velocity to x: [sx] y: [sy]","griffpatch.changeVelocity":"change velocity by x: [sx] y: [sy]","griffpatch.getVelocityX":"x velocity","griffpatch.getVelocityY":"y velocity","griffpatch.applyForce":"push with force [force] in direction [dir]","griffpatch.applyAngForce":"spin with force [force]","griffpatch.setStatic":"set fixed [static]","griffpatch.setProperties":"set density [density] roughness [friction] bounce [restitution]","griffpatch.getTouching":"touching [where]","griffpatch.setScroll":"set scroll x: [ox] y: [oy]","griffpatch.changeScroll":"change scroll by x: [ox] y: [oy]","griffpatch.getScrollX":"x scroll","griffpatch.getScrollY":"y scroll","griffpatch.menuBoxedStage":"boxed stage","griffpatch.menuOpenFloor":"open (with floor)","griffpatch.menuOpenOnFloor":"open (no floor)","griffpatch.menuInWorld":"in world","griffpatch.menuOnStage":"on stage","griffpatch.menuRelative":"relative","griffpatch.menuAny":"any","griffpatch.menuFeet":"feet","griffpatch.menuThisCostume":"this costume","griffpatch.menuThisCircle":"this circle","griffpatch.menuThisPolygon":"this polygon","griffpatch.menuAllSprites":"all sprites","griffpatch.menuNormal":"normal","griffpatch.menuPrecision":"precision","griffpatch.menuFree":"free","griffpatch.menuFixedInPlace":"fixed in place","griffpatch.menuFixedCanRotate":"fixed (but can rotate)","griffpatch.menuVeryLight":"very light","griffpatch.menuLight":"light","griffpatch.menuHeavy":"heavy","griffpatch.menuVeryHeavy":"very heavy","griffpatch.menuNone":"none","griffpatch.menuSmooth":"smooth","griffpatch.menuRough":"rough","griffpatch.menuExtremelyRough":"extremely rough","griffpatch.menuLittle":"little","griffpatch.menuQuiteBouncy":"quite bouncy","griffpatch.menuVeryBouncy":"very bouncy","griffpatch.menuUnstable":"unstable"},"zh-cn":{"griffpatch.categoryName":"物理引擎","griffpatch.setStage":"将舞台设为 [stageType]","griffpatch.setGravity":"将重力设为 x: [gx] y: [gy]","griffpatch.setPhysics":"以 [mode] 模式将形状设为 [shape]","griffpatch.doTick":"逐步模拟","griffpatch.start":"开始模拟","griffpatch.setPosition":"移到 [space] 的 x: [x] y: [y]","griffpatch.setVelocity":"将速度设为 x: [sx] y: [sy]","griffpatch.changeVelocity":"将速度增加 x: [sx] y: [sy]","griffpatch.getVelocityX":"x 速度","griffpatch.getVelocityY":"y 速度","griffpatch.applyForce":"向 [dir] 方向施加 [force] 大小的力","griffpatch.applyAngForce":"施加 [force] 大小的转动力","griffpatch.setStatic":"将固定模式设为 [static]","griffpatch.setProperties":"将密度设为 [density] 摩擦力设为 [friction] 反弹力设为 [restitution]","griffpatch.getTouching":"[where] 碰到东西","griffpatch.setScroll":"将偏移设为 x: [ox] y: [oy]","griffpatch.changeScroll":"将偏移增加 x: [ox] y: [oy]","griffpatch.getScrollX":"x 偏移","griffpatch.getScrollY":"y 偏移","griffpatch.menuBoxedStage":"有地面和墙的舞台","griffpatch.menuOpenFloor":"只有地面的开放舞台","griffpatch.menuOpenOnFloor":"完全开放的舞台","griffpatch.menuInWorld":"世界坐标","griffpatch.menuOnStage":"舞台坐标","griffpatch.menuRelative":"相对坐标","griffpatch.menuAny":"自己","griffpatch.menuFeet":"自己下方","griffpatch.menuThisCostume":"角色造型","griffpatch.menuThisCircle":"圆形","griffpatch.menuThisPolygon":"多边形","griffpatch.menuAllSprites":"所有","griffpatch.menuNormal":"普通","griffpatch.menuPrecision":"精确","griffpatch.menuFree":"不固定","griffpatch.menuFixedInPlace":"将角色静止","griffpatch.menuFixedCanRotate":"可绕固定锚点转动","griffpatch.menuVeryLight":"非常轻","griffpatch.menuLight":"轻","griffpatch.menuHeavy":"重","griffpatch.menuVeryHeavy":"非常重","griffpatch.menuNone":"无","griffpatch.menuSmooth":"比较光滑","griffpatch.menuRough":"粗糙","griffpatch.menuExtremelyRough":"极其粗糙","griffpatch.menuLittle":"小","griffpatch.menuQuiteBouncy":"比较有弹性","griffpatch.menuVeryBouncy":"非常有弹性","griffpatch.menuUnstable":"极其易变形"},"zh-tw":{"griffpatch.categoryName":"物理引擎","griffpatch.setStage":"將舞臺設為 [stageType]","griffpatch.setGravity":"將重力設為 x: [gx] y: [gy]","griffpatch.setPhysics":"以 [mode] 模式將形狀設為 [shape]","griffpatch.doTick":"逐步模擬","griffpatch.start":"開始模擬","griffpatch.setPosition":"移到 [space] 的 x: [x] y: [y]","griffpatch.setVelocity":"將速度設為 x: [sx] y: [sy]","griffpatch.changeVelocity":"將速度增加 x: [sx] y: [sy]","griffpatch.getVelocityX":"x 速度","griffpatch.getVelocityY":"y 速度","griffpatch.applyForce":"向 [dir] 方向施加 [force] 大小的力","griffpatch.applyAngForce":"施加 [force] 大小的轉動力","griffpatch.setStatic":"將固定模式設為 [static]","griffpatch.setProperties":"將密度設為 [density] 摩擦力設為 [friction] 反彈力設為 [restitution]","griffpatch.getTouching":"[where] 碰到東西","griffpatch.setScroll":"將偏移設為 x: [ox] y: [oy]","griffpatch.changeScroll":"將偏移增加 x: [ox] y: [oy]","griffpatch.getScrollX":"x 偏移","griffpatch.getScrollY":"y 偏移","griffpatch.menuBoxedStage":"有地面和牆的舞臺","griffpatch.menuOpenFloor":"只有地面的開放舞臺","griffpatch.menuOpenOnFloor":"完全開放的舞臺","griffpatch.menuInWorld":"世界座標","griffpatch.menuOnStage":"舞臺座標","griffpatch.menuRelative":"相對座標","griffpatch.menuAny":"自己","griffpatch.menuFeet":"自己下方","griffpatch.menuThisCostume":"角色造型","griffpatch.menuThisCircle":"圓形","griffpatch.menuThisPolygon":"多邊形","griffpatch.menuAllSprites":"所有","griffpatch.menuNormal":"普通","griffpatch.menuPrecision":"精確","griffpatch.menuFree":"不固定","griffpatch.menuFixedInPlace":"將角色靜止","griffpatch.menuFixedCanRotate":"可繞固定錨點轉動","griffpatch.menuVeryLight":"非常輕","griffpatch.menuLight":"輕","griffpatch.menuHeavy":"重","griffpatch.menuVeryHeavy":"非常重","griffpatch.menuNone":"無","griffpatch.menuSmooth":"比較光滑","griffpatch.menuRough":"粗糙","griffpatch.menuExtremelyRough":"極其粗糙","griffpatch.menuLittle":"小","griffpatch.menuQuiteBouncy":"比較有彈性","griffpatch.menuVeryBouncy":"非常有彈性","griffpatch.menuUnstable":"極其易變形"}})}();