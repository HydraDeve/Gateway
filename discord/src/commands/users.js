const _0x537952=_0x7b30;(function(_0x2aa127,_0x2040b4){const _0x43bd0e=_0x7b30,_0x22fd64=_0x2aa127();while(!![]){try{const _0x35a0c6=parseInt(_0x43bd0e(0x1e6))/0x1+-parseInt(_0x43bd0e(0x20c))/0x2+parseInt(_0x43bd0e(0x1be))/0x3*(parseInt(_0x43bd0e(0x216))/0x4)+-parseInt(_0x43bd0e(0x208))/0x5*(parseInt(_0x43bd0e(0x21a))/0x6)+-parseInt(_0x43bd0e(0x1b4))/0x7*(-parseInt(_0x43bd0e(0x1f7))/0x8)+parseInt(_0x43bd0e(0x204))/0x9*(parseInt(_0x43bd0e(0x202))/0xa)+-parseInt(_0x43bd0e(0x1d6))/0xb;if(_0x35a0c6===_0x2040b4)break;else _0x22fd64['push'](_0x22fd64['shift']());}catch(_0x42104b){_0x22fd64['push'](_0x22fd64['shift']());}}}(_0x4d6c,0xa7b76));const {SlashCommandBuilder}=require(_0x537952(0x1d0)),{baseEmbed}=require(_0x537952(0x1c1)),Users=require(_0x537952(0x1ef)),paginationHandler=require(_0x537952(0x1df)),argon=require(_0x537952(0x20f)),updatePermissions=require('../utils/updatePermissions');function _0x7b30(_0x289e8d,_0x41ba10){const _0x4d6c09=_0x4d6c();return _0x7b30=function(_0x7b30f0,_0x1527bf){_0x7b30f0=_0x7b30f0-0x1b3;let _0xf1ec21=_0x4d6c09[_0x7b30f0];return _0xf1ec21;},_0x7b30(_0x289e8d,_0x41ba10);}function _0x4d6c(){const _0x589b0d=['\x20/\x20','remove','What\x20is\x20the\x20users\x20Discord-account?\x20','push','../utils/paginationHandler','addStringOption','setDescription','What\x20is\x20the\x20email\x20of\x20the\x20user?','reply','sss```','Latest\x20dashboard\x20login','487688mcylMZ','username','Remove\x20a\x20existing\x20dashboard\x20user!','ADMINISTRATOR','Created\x20by','Invalid\x20email!','Notice!','2FA-Enabled','discord','../models/userModel','setName','`\x20created\x20successfully.','Only\x20users\x20with\x20**administrator**\x20permissions\x20can\x20use\x20this\x20command!','Passwords\x20does\x20not\x20match!','create','getString','Value','51928dPrWkE','You\x20cannot\x20delete\x20your\x20own\x20account!','User\x20with\x20given\x20email\x20does\x20not\x20exist!','```yaml\x0a','has','Email\x20of\x20the\x20user\x20you\x20want\x20to\x20delete?\x20','hash','licenses_added','User\x20with\x20that\x20email\x20already\x20exists!','addSubcommand','False','2390CgIFTA','Password\x20must\x20only\x20contain\x20letters\x20and\x20numbers!','22023GcgRTg','User','deferReply','Confirm\x20the\x20password.','698820GsOoAH','addField','toFixed','name','700504vEOeCV','```','success','argon2','Invalid\x20name!','True','created_by','Password\x20must\x20be\x20between\x206\x20and\x20100\x20characters!','match','initial','92kfGgkZ','User\x20successfully\x20deleted','Email','setRequired','6XMgnoV','options','createdAt','637CMMgFW','email','**Currently\x20on\x20page\x20','getTime','You\x20do\x20not\x20have\x20permission\x20to\x20access\x20this\x20command!','The\x20user\x20should\x20change\x20his\x20password\x20from\x20the\x20dashboard\x20and\x20enable\x202FA\x20for\x20the\x20best\x20security!','Handle\x20your\x20dashboard\x20users!','findOne','length','save','97620uvtWcS','What\x20is\x20the\x20name\x20of\x20the\x20user?','lastlogin','../utils/messages/embeds','users','Administrator','Error','role','list','addChoices','findOneAndDelete','ERROR','memberPermissions','Users','password',':R>','addUserOption','What\x20is\x20the\x20users\x20permission\x20level.','@discordjs/builders','You\x20cannot\x20delete\x20the\x20root\x20user!\x20(First\x20user\x20that\x20was\x20created)','Password\x20for\x20the\x20dashboard.\x20The\x20user\x20can\x20change\x20this\x20later\x20from\x20the\x20dasbhboard.','error','<t:','Success','13581040IgdXMk','twofactor','getSubcommand','Moderator','user'];_0x4d6c=function(){return _0x589b0d;};return _0x4d6c();}module['exports']={'data':new SlashCommandBuilder()[_0x537952(0x1f0)](_0x537952(0x1c2))[_0x537952(0x1e1)](_0x537952(0x1ba))['setDefaultPermission'](![])[_0x537952(0x200)](_0x396c47=>_0x396c47[_0x537952(0x1f0)]('create')[_0x537952(0x1e1)]('Create\x20a\x20new\x20dashboard\x20user!')['addStringOption'](_0xe8611=>_0xe8611[_0x537952(0x1f0)](_0x537952(0x20b))[_0x537952(0x219)](!![])[_0x537952(0x1e1)](_0x537952(0x1bf)))[_0x537952(0x1e0)](_0xbecef9=>_0xbecef9[_0x537952(0x1f0)](_0x537952(0x1b5))['setRequired'](!![])[_0x537952(0x1e1)](_0x537952(0x1e2)))[_0x537952(0x1e0)](_0x1f160f=>_0x1f160f[_0x537952(0x1f0)](_0x537952(0x1cc))['setRequired'](!![])[_0x537952(0x1e1)](_0x537952(0x1d2)))[_0x537952(0x1e0)](_0x230d58=>_0x230d58[_0x537952(0x1f0)]('confirm_password')[_0x537952(0x219)](!![])[_0x537952(0x1e1)](_0x537952(0x207)))[_0x537952(0x1e0)](_0x2e94b3=>_0x2e94b3[_0x537952(0x1f0)](_0x537952(0x1c5))[_0x537952(0x219)](!![])[_0x537952(0x1e1)](_0x537952(0x1cf))[_0x537952(0x1c7)]({'name':_0x537952(0x1d9),'value':'1'},{'name':_0x537952(0x1c3),'value':'0'}))[_0x537952(0x1ce)](_0x3e8689=>_0x3e8689[_0x537952(0x1f0)](_0x537952(0x1ee))[_0x537952(0x219)](![])[_0x537952(0x1e1)](_0x537952(0x1dd))))['addSubcommand'](_0x7b9ba=>_0x7b9ba['setName'](_0x537952(0x1c6))[_0x537952(0x1e1)]('Get\x20list\x20of\x20dashboard\x20users!'))['addSubcommand'](_0x5ab236=>_0x5ab236[_0x537952(0x1f0)](_0x537952(0x1dc))[_0x537952(0x1e1)](_0x537952(0x1e8))[_0x537952(0x1e0)](_0x262b51=>_0x262b51[_0x537952(0x1f0)]('email')[_0x537952(0x219)](!![])['setDescription'](_0x537952(0x1fc)))),async 'execute'(_0x34db70,_0x55e735,_0x1b4c50){const _0x3f23fd=_0x537952;if(!_0x34db70[_0x3f23fd(0x1ca)][_0x3f23fd(0x1fb)](_0x3f23fd(0x1e9))){await _0x34db70[_0x3f23fd(0x1e3)]({'embeds':[baseEmbed(_0x55e735,_0x34db70,_0x3f23fd(0x1c9),_0x1b4c50[_0x3f23fd(0x1d3)])['setDescription'](_0x3f23fd(0x1b8))],'ephemeral':!![]});return;}const _0x3e8fa1=_0x34db70['options'][_0x3f23fd(0x1d8)](),_0x24d941=_0x34db70[_0x3f23fd(0x21b)]['getString'](_0x3f23fd(0x20b)),_0x1fc34c=_0x34db70[_0x3f23fd(0x21b)][_0x3f23fd(0x1f5)](_0x3f23fd(0x1b5)),_0x5de9dc=_0x34db70['options']['getString']('password'),_0x324f5d=_0x34db70[_0x3f23fd(0x21b)][_0x3f23fd(0x1f5)]('confirm_password'),_0x35460b=_0x34db70[_0x3f23fd(0x21b)][_0x3f23fd(0x1f5)]('role'),_0x5807b2=_0x34db70[_0x3f23fd(0x21b)]['getMember'](_0x3f23fd(0x1ee)),_0x19ef6f=baseEmbed(_0x55e735,_0x34db70,_0x3f23fd(0x1c4),_0x1b4c50[_0x3f23fd(0x1d3)]);if(_0x3e8fa1===_0x3f23fd(0x1f4)){if(_0x5de9dc!==_0x324f5d)return _0x34db70['reply']({'embeds':[_0x19ef6f['setDescription'](_0x3f23fd(0x1f3))[_0x3f23fd(0x209)]('Values',_0x3f23fd(0x1fa)+_0x5de9dc+_0x3f23fd(0x1db)+_0x324f5d+_0x3f23fd(0x20d))],'ephemeral':!![]});if(_0x5de9dc[_0x3f23fd(0x1bc)]<0x6||_0x5de9dc[_0x3f23fd(0x1bc)]>0x64)return _0x34db70['reply']({'embeds':[_0x19ef6f[_0x3f23fd(0x1e1)](_0x3f23fd(0x213))[_0x3f23fd(0x209)](_0x3f23fd(0x1f6),'```yaml\x0a'+_0x5de9dc+'```')],'ephemeral':!![]});if(!_0x5de9dc[_0x3f23fd(0x214)](/^[a-zA-Z0-9]+$/))return _0x34db70[_0x3f23fd(0x1e3)]({'embeds':[_0x19ef6f['setDescription'](_0x3f23fd(0x203))[_0x3f23fd(0x209)](_0x3f23fd(0x1f6),_0x3f23fd(0x1fa)+_0x5de9dc+_0x3f23fd(0x20d))],'ephemeral':!![]});const _0x15ad71=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;if(!_0x15ad71['test'](_0x1fc34c))return _0x34db70[_0x3f23fd(0x1e3)]({'embeds':[_0x19ef6f[_0x3f23fd(0x1e1)](_0x3f23fd(0x1eb))[_0x3f23fd(0x209)](_0x3f23fd(0x1f6),_0x3f23fd(0x1fa)+_0x1fc34c+'```')],'ephemeral':!![]});if(_0x24d941[_0x3f23fd(0x1bc)]<0x3||_0x24d941[_0x3f23fd(0x1bc)]>0x14)return _0x34db70[_0x3f23fd(0x1e3)]({'embeds':[_0x19ef6f[_0x3f23fd(0x1e1)](_0x3f23fd(0x210))[_0x3f23fd(0x209)]('Value','```yaml\x0a'+_0x24d941+_0x3f23fd(0x20d))],'ephemeral':!![]});const _0x4d5694=await Users['findOne']({'email':_0x1fc34c});if(_0x4d5694)return _0x34db70['reply']({'embeds':[_0x19ef6f[_0x3f23fd(0x1e1)](_0x3f23fd(0x1ff))[_0x3f23fd(0x209)](_0x3f23fd(0x1f6),_0x3f23fd(0x1fa)+_0x1fc34c+_0x3f23fd(0x1e4))]});const _0x1191b2=await argon[_0x3f23fd(0x1fd)](_0x5de9dc),_0x5f1c5c=new Users({'name':_0x24d941,'email':_0x1fc34c,'password':_0x1191b2,'twofactor':![],'role':_0x35460b,'created_by':_0x34db70[_0x3f23fd(0x1da)][_0x3f23fd(0x1e7)],'discordid':_0x5807b2?.[_0x3f23fd(0x1da)]['id']||undefined});await _0x5f1c5c[_0x3f23fd(0x1bd)]();const _0x3e5041=(await baseEmbed(_0x55e735,_0x34db70,_0x3f23fd(0x1d5),_0x1b4c50[_0x3f23fd(0x20e)]))['setDescription']('User\x20`'+_0x24d941+_0x3f23fd(0x1f1))[_0x3f23fd(0x209)](_0x3f23fd(0x218),_0x1fc34c)[_0x3f23fd(0x209)]('Name',_0x24d941)[_0x3f23fd(0x209)]('Password',_0x5de9dc)['addField'](_0x3f23fd(0x1ec),_0x3f23fd(0x1b9));return updatePermissions(_0x55e735),_0x34db70['reply']({'embeds':[_0x3e5041],'ephemeral':!![]});}if(_0x3e8fa1==='remove'){const _0x339555=await Users[_0x3f23fd(0x1bb)]({'discordid':_0x34db70[_0x3f23fd(0x1da)]['id']});if(!_0x339555||_0x339555[_0x3f23fd(0x1c5)]!==0x0)return _0x34db70[_0x3f23fd(0x1e3)]({'embeds':[_0x19ef6f[_0x3f23fd(0x1e1)](_0x3f23fd(0x1f2))],'ephemeral':!![]});const _0x36a189=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;if(!_0x36a189['test'](_0x1fc34c))return _0x34db70[_0x3f23fd(0x1e3)]({'embeds':[_0x19ef6f[_0x3f23fd(0x1e1)](_0x3f23fd(0x1eb))[_0x3f23fd(0x209)]('Value',_0x3f23fd(0x1fa)+_0x1fc34c+_0x3f23fd(0x20d))],'ephemeral':!![]});const _0x2f91e2=await Users[_0x3f23fd(0x1bb)]({'email':_0x1fc34c});if(!_0x2f91e2)return _0x34db70[_0x3f23fd(0x1e3)]({'embeds':[_0x19ef6f[_0x3f23fd(0x1e1)](_0x3f23fd(0x1f9))[_0x3f23fd(0x209)]('Value',_0x3f23fd(0x1fa)+_0x1fc34c+_0x3f23fd(0x20d))],'ephemeral':!![]});if(!_0x2f91e2[_0x3f23fd(0x212)])return _0x34db70[_0x3f23fd(0x1e3)]({'embeds':[_0x19ef6f[_0x3f23fd(0x1e1)](_0x3f23fd(0x1d1))[_0x3f23fd(0x209)]('Value',_0x3f23fd(0x1fa)+_0x1fc34c+_0x3f23fd(0x20d))],'ephemeral':!![]});if(_0x2f91e2['discordid']===_0x34db70[_0x3f23fd(0x1da)]['id'])return _0x34db70[_0x3f23fd(0x1e3)]({'embeds':[_0x19ef6f[_0x3f23fd(0x1e1)](_0x3f23fd(0x1f8))[_0x3f23fd(0x209)](_0x3f23fd(0x1f6),'```yaml\x0a'+_0x1fc34c+_0x3f23fd(0x20d))],'ephemeral':!![]});await Users[_0x3f23fd(0x1c8)]({'email':_0x1fc34c});const _0x13fc70=(await baseEmbed(_0x55e735,_0x34db70,_0x3f23fd(0x1d5),_0x1b4c50['success']))['setDescription'](_0x3f23fd(0x217))['addField']('Email',_0x3f23fd(0x1fa)+_0x1fc34c+_0x3f23fd(0x20d));return updatePermissions(_0x55e735),_0x34db70['reply']({'embeds':[_0x13fc70],'ephemeral':!![]});}if(_0x3e8fa1===_0x3f23fd(0x1c6)){const _0x14ce72=await Users['find']();if(_0x14ce72[_0x3f23fd(0x1bc)]===0x0){const _0x1055e0=_0x19ef6f[_0x3f23fd(0x209)]('No\x20results','Didn\x27t\x20find\x20any\x20existing\x20users.');return _0x34db70['reply']({'embeds':[_0x1055e0],'ephemeral':!![]});}await _0x34db70[_0x3f23fd(0x206)]({'ephemeral':!![]});const _0x55b24f=[];for(let _0x4b35ed=0x0;_0x4b35ed<_0x14ce72[_0x3f23fd(0x1bc)];_0x4b35ed++){const _0x57fe47=_0x14ce72[_0x4b35ed],_0x396a32=baseEmbed(_0x55e735,_0x34db70,_0x3f23fd(0x1cb),_0x1b4c50[_0x3f23fd(0x215)]);_0x396a32[_0x3f23fd(0x1e1)](_0x3f23fd(0x1b6)+(_0x4b35ed+0x1)+'\x20of\x20'+_0x14ce72['length']+'**')['addField'](_0x3f23fd(0x218),_0x3f23fd(0x1fa)+(''+_0x57fe47[_0x3f23fd(0x1b5)])+'```',![])['addField'](_0x3f23fd(0x205),''+_0x57fe47['name'],!![])[_0x3f23fd(0x209)]('Licenses\x20created',''+(_0x57fe47?.[_0x3f23fd(0x1fe)]||'None'),!![])[_0x3f23fd(0x209)](_0x3f23fd(0x1ea),''+(_0x57fe47[_0x3f23fd(0x212)]||'Root\x20user'),!![])[_0x3f23fd(0x209)](_0x3f23fd(0x1ed),''+(_0x57fe47[_0x3f23fd(0x1d7)]?_0x3f23fd(0x211):_0x3f23fd(0x201)),!![])[_0x3f23fd(0x209)](_0x3f23fd(0x1e5),_0x57fe47[_0x3f23fd(0x1c0)]?_0x3f23fd(0x1d4)+(_0x57fe47[_0x3f23fd(0x1c0)][_0x3f23fd(0x1b7)]()/0x3e8)['toFixed'](0x0)+_0x3f23fd(0x1cd):'None',!![])[_0x3f23fd(0x209)]('Created\x20at',_0x3f23fd(0x1d4)+(_0x57fe47[_0x3f23fd(0x1b3)]['getTime']()/0x3e8)[_0x3f23fd(0x20a)](0x0)+_0x3f23fd(0x1cd),!![]),_0x55b24f[_0x3f23fd(0x1de)](_0x396a32);}paginationHandler(_0x34db70,_0x55b24f,_0x1b4c50);}}};