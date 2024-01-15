import { Request, Response } from "express";
import User from "../models/user";
import bcryptjs from 'bcryptjs';
const nodemailer = require("nodemailer");


export const getUsers = async (req: Request, res: Response) => {

  const users = await User.findMany();
  res.json(users);
}

export const getSellers = async (req: Request, res: Response) => {

  const sellers = await User.findMany(
    {
      where: {
        type: 2,
      },
      include: {
        userType: true,
      },
    }
  );
  res.json(sellers);
}

export const getUser = async (req: Request, res: Response) => {

  const { id } = req.params;
  try {
    const user = await User.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        msg: `No existe el usuario con el id ${id}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener el usuario'
    });
  }
}

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user = await User.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        msg: `No existe el usuario con el correo ${email}`
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener el usuario'
    });
  }
}

export const postUser = async (req: Request, res: Response) => {

  const { body } = req;
  try {
    const existeEmail = await User.findUnique({
      where: {
        email: (body.email),
      },
    });
    if (existeEmail) {
      return res.status(404).json({
        msg: `Ya existe un usuario con el email ${body.email}`
      });
    } else {
      // Encriptar la contraseña
      const salt = bcryptjs.genSaltSync();
      body.password = bcryptjs.hashSync(body.password, salt);
      const user = await User.create({
        data: {
          type: body.type,
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: body.password,
          address: body.address,
          stateId: body.stateId,
          cityId: body.cityId,
          phone: body.phone,
          birthday: body.birthday,
        },
      });
      const message = `${process.env.BASE_URL}/api/users/validateAccount/${user.id}`;
      await sendEmail(user.email, user.firstName + ' ' + user.lastName, message);

      res.json({
        msg: 'Un email de verificación ha sido enviado a su correo', status: 'ok'
      });
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al crear el usuario'
    });
  }

}

export const putUser = async (req: Request, res: Response) => {

  const { id } = req.params;
  const { body } = req;
  try {
    const user = await User.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return res.status(404).json({
        msg: `No existe un usuario con el id ${id}`
      });
    }
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    body.password = bcryptjs.hashSync(body.password, salt);

    const updatedUser = await User.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al actualizar el usuario'
    });
  }
}

export const deleteUser = async (req: Request, res: Response) => {

  const { id } = req.params;
  try {
    const user = await User.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return res.status(404).json({
        msg: `No existe un usuario con el id ${id}`
      });
    }
    await User.update({
      where: {
        id: parseInt(id),
      },
      data: {
        deletedAt: new Date(),
      },
    },);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al desactivar el usuario'
    },);
  }
}

const sendEmail = async (email: string, name: string, text: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: "Verificar Email subelotodo",
      html: `<!doctype html>
      <html ⚡4email data-css-strict>
       <head><meta charset="utf-8"><style amp4email-boilerplate>body{visibility:hidden}</style><script async src="https://cdn.ampproject.org/v0.js"></script>
        
        <style amp-custom>
      .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
      }
      body {
        width:100%;
        font-family:arial, "helvetica neue", helvetica, sans-serif;
      }
      table {
        border-collapse:collapse;
        border-spacing:0px;
      }
      table td, body, .es-wrapper {
        padding:0;
        Margin:0;
      }
      .es-content, .es-header, .es-footer {
        table-layout:fixed;
        width:100%;
      }
      p, hr {
        Margin:0;
      }
      h1, h2, h3, h4, h5 {
        Margin:0;
        line-height:120%;
        font-family:Montserrat, sans-serif;
      }
      .es-left {
        float:left;
      }
      .es-right {
        float:right;
      }
      .es-p5 {
        padding:5px;
      }
      .es-p5t {
        padding-top:5px;
      }
      .es-p5b {
        padding-bottom:5px;
      }
      .es-p5l {
        padding-left:5px;
      }
      .es-p5r {
        padding-right:5px;
      }
      .es-p10 {
        padding:10px;
      }
      .es-p10t {
        padding-top:10px;
      }
      .es-p10b {
        padding-bottom:10px;
      }
      .es-p10l {
        padding-left:10px;
      }
      .es-p10r {
        padding-right:10px;
      }
      .es-p15 {
        padding:15px;
      }
      .es-p15t {
        padding-top:15px;
      }
      .es-p15b {
        padding-bottom:15px;
      }
      .es-p15l {
        padding-left:15px;
      }
      .es-p15r {
        padding-right:15px;
      }
      .es-p20 {
        padding:20px;
      }
      .es-p20t {
        padding-top:20px;
      }
      .es-p20b {
        padding-bottom:20px;
      }
      .es-p20l {
        padding-left:20px;
      }
      .es-p20r {
        padding-right:20px;
      }
      .es-p25 {
        padding:25px;
      }
      .es-p25t {
        padding-top:25px;
      }
      .es-p25b {
        padding-bottom:25px;
      }
      .es-p25l {
        padding-left:25px;
      }
      .es-p25r {
        padding-right:25px;
      }
      .es-p30 {
        padding:30px;
      }
      .es-p30t {
        padding-top:30px;
      }
      .es-p30b {
        padding-bottom:30px;
      }
      .es-p30l {
        padding-left:30px;
      }
      .es-p30r {
        padding-right:30px;
      }
      .es-p35 {
        padding:35px;
      }
      .es-p35t {
        padding-top:35px;
      }
      .es-p35b {
        padding-bottom:35px;
      }
      .es-p35l {
        padding-left:35px;
      }
      .es-p35r {
        padding-right:35px;
      }
      .es-p40 {
        padding:40px;
      }
      .es-p40t {
        padding-top:40px;
      }
      .es-p40b {
        padding-bottom:40px;
      }
      .es-p40l {
        padding-left:40px;
      }
      .es-p40r {
        padding-right:40px;
      }
      .es-menu td {
        border:0;
      }
      s {
        text-decoration:line-through;
      }
      p, ul li, ol li {
        font-family:Montserrat, sans-serif;
        line-height:150%;
      }
      ul li, ol li {
        Margin-bottom:15px;
        margin-left:0;
      }
      a {
        text-decoration:underline;
      }
      .es-menu td a {
        text-decoration:none;
        display:block;
        font-family:arial, "helvetica neue", helvetica, sans-serif;
      }
      .es-wrapper {
        width:100%;
        height:100%;
      }
      .es-wrapper-color, .es-wrapper {
        background-color:#FFFFFF;
      }
      .es-header {
        background-color:transparent;
      }
      .es-header-body {
        background-color:#FFFFFF;
      }
      .es-header-body p, .es-header-body ul li, .es-header-body ol li {
        color:#333333;
        font-size:14px;
      }
      .es-header-body a {
        color:#134F5C;
        font-size:14px;
      }
      .es-content-body {
        background-color:#FFFFFF;
      }
      .es-content-body p, .es-content-body ul li, .es-content-body ol li {
        color:#333333;
        font-size:16px;
      }
      .es-content-body a {
        color:#134F5C;
        font-size:16px;
      }
      .es-footer {
        background-color:transparent;
      }
      .es-footer-body {
        background-color:#FFFFFF;
      }
      .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li {
        color:#333333;
        font-size:12px;
      }
      .es-footer-body a {
        color:#134F5C;
        font-size:12px;
      }
      .es-infoblock, .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li {
        line-height:120%;
        font-size:12px;
        color:#CCCCCC;
      }
      .es-infoblock a {
        font-size:12px;
        color:#CCCCCC;
      }
      h1 {
        font-size:70px;
        font-style:normal;
        font-weight:normal;
        color:#333333;
      }
      h2 {
        font-size:36px;
        font-style:normal;
        font-weight:normal;
        color:#333333;
      }
      h3 {
        font-size:20px;
        font-style:normal;
        font-weight:normal;
        color:#333333;
      }
      .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {
        font-size:70px;
      }
      .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {
        font-size:36px;
      }
      .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {
        font-size:20px;
      }
      a.es-button, button.es-button {
        padding:10px 30px 10px 30px;
        display:inline-block;
        background:#FEF3E6;
        border-radius:0px;
        font-size:16px;
        font-family:Montserrat, sans-serif;
        font-weight:normal;
        font-style:normal;
        line-height:120%;
        color:#666666;
        text-decoration:none;
        width:auto;
        text-align:center;
      }
      .es-button-border {
        border-style:solid solid solid solid;
        border-color:#999999 #999999 #999999 #999999;
        background:#FEF3E6;
        border-width:1px 1px 1px 1px;
        display:inline-block;
        border-radius:0px;
        width:auto;
      }
      body {
        font-family:Montserrat, sans-serif;
      }
      .es-menu amp-img, .es-button amp-img {
        vertical-align:middle;
      }
      @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150% } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120% } h1 { font-size:42px; text-align:center } h2 { font-size:26px; text-align:center } h3 { font-size:20px; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:42px } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px } .es-menu td a { font-size:14px } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px } *[class="gmail-fix"] { display:none } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left } .es-m-txt-r amp-img { float:right } .es-m-txt-c amp-img { margin:0 auto } .es-m-txt-l amp-img { float:left } .es-button-border { display:block } a.es-button, button.es-button { font-size:16px; display:block; border-right-width:0px; border-left-width:0px; border-bottom-width:15px; border-top-width:15px } .es-adaptive table, .es-left, .es-right { width:100% } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%; max-width:600px } .es-adapt-td { display:block; width:100% } .adapt-img { width:100%; height:auto } td.es-m-p0 { padding:0 } td.es-m-p0r { padding-right:0 } td.es-m-p0l { padding-left:0 } td.es-m-p0t { padding-top:0 } td.es-m-p0b { padding-bottom:0 } td.es-m-p20b { padding-bottom:20px } .es-mobile-hidden, .es-hidden { display:none } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto; overflow:visible; float:none; max-height:inherit; line-height:inherit } tr.es-desk-hidden { display:table-row } table.es-desk-hidden { display:table } td.es-desk-menu-hidden { display:table-cell } .es-menu td { width:1% } table.es-table-not-adapt, .esd-block-html table { width:auto } table.es-social { display:inline-block } table.es-social td { display:inline-block } td.es-m-p5 { padding:5px } td.es-m-p5t { padding-top:5px } td.es-m-p5b { padding-bottom:5px } td.es-m-p5r { padding-right:5px } td.es-m-p5l { padding-left:5px } td.es-m-p10 { padding:10px } td.es-m-p10t { padding-top:10px } td.es-m-p10b { padding-bottom:10px } td.es-m-p10r { padding-right:10px } td.es-m-p10l { padding-left:10px } td.es-m-p15 { padding:15px } td.es-m-p15t { padding-top:15px } td.es-m-p15b { padding-bottom:15px } td.es-m-p15r { padding-right:15px } td.es-m-p15l { padding-left:15px } td.es-m-p20 { padding:20px } td.es-m-p20t { padding-top:20px } td.es-m-p20r { padding-right:20px } td.es-m-p20l { padding-left:20px } td.es-m-p25 { padding:25px } td.es-m-p25t { padding-top:25px } td.es-m-p25b { padding-bottom:25px } td.es-m-p25r { padding-right:25px } td.es-m-p25l { padding-left:25px } td.es-m-p30 { padding:30px } td.es-m-p30t { padding-top:30px } td.es-m-p30b { padding-bottom:30px } td.es-m-p30r { padding-right:30px } td.es-m-p30l { padding-left:30px } td.es-m-p35 { padding:35px } td.es-m-p35t { padding-top:35px } td.es-m-p35b { padding-bottom:35px } td.es-m-p35r { padding-right:35px } td.es-m-p35l { padding-left:35px } td.es-m-p40 { padding:40px } td.es-m-p40t { padding-top:40px } td.es-m-p40b { padding-bottom:40px } td.es-m-p40r { padding-right:40px } td.es-m-p40l { padding-left:40px } .es-desk-hidden { display:table-row; width:auto; overflow:visible; max-height:inherit } }
      </style>
       </head>
       <body>
        <div dir="ltr" class="es-wrapper-color" lang="es">
         <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#ffffff"></v:fill>
            </v:background>
          <![endif]-->
         <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
           <tr>
            <td valign="top">
             <table cellpadding="0" cellspacing="0" class="es-content" align="center">
               <tr>
                <td align="center">
                 <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="700">
                   <tr>
                    <td class="es-p40t es-p20b es-p20r es-p20l" align="left">
                     <table cellpadding="0" cellspacing="0" width="100%">
                       <tr>
                        <td width="660" align="center" valign="top">
                         <table cellpadding="0" cellspacing="0" width="100%">
                           <tr>
                            <td align="center" style="font-size: 0px"><amp-img class="adapt-img" src="https://ecsiexm.stripocdn.email/content/guids/CABINET_87f83ff3c61ff2eeacc3c2f5edc14bed5132a12b13ed6efe736588bb90109770/images/logo_1.png" alt style="display: block" width="355" height="164" layout="responsive"></amp-img></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-p20" style="font-size:0">
                             <table border="0" width="100%" cellpadding="0" cellspacing="0">
                               <tr>
                                <td style="border-bottom: 1px solid #cccccc;background: unset;height:1px;width:100%;margin:0px 0px 0px 0px"></td>
                               </tr>
                             </table></td>
                           </tr>
                           <tr>
                            <td align="center"><h2>Verifica tu email para completar tu registro.</h2></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-p10t es-p10b es-m-txt-c" style="font-size:0">
                             <table border="0" width="40%" cellpadding="0" cellspacing="0" style="width: 40% ;display: inline-table">
                               <tr>
                                <td style="border-bottom: 1px solid #cccccc;background:none;height:1px;width:100%;margin:0px 0px 0px 0px"></td>
                               </tr>
                             </table></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-p5t es-p5b es-p40r es-m-p0r"><p>`+ name + `, gracias por unirte a Subelotodo</p><p><br></p><p>Por favor confirma que&nbsp;<strong><a target="_blank" style="text-decoration: none">` + email + `</a></strong> es tu direccion de email haciendo click en el boton a continuación.</p></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-p10t es-p10b es-m-txt-c" style="font-size:0">
                             <table border="0" width="40%" cellpadding="0" cellspacing="0" style="width: 40% ;display: inline-table">
                               <tr>
                                <td style="border-bottom: 1px solid #cccccc;background:none;height:1px;width:100%;margin:0px 0px 0px 0px"></td>
                               </tr>
                             </table></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-p10t es-p10b es-m-txt-l"><span class="es-button-border" style="border-radius: 8px;border-width: 0px;background: #d0413d"><a href="`+ text + `" class="es-button" target="_blank" style="background: #d0413d;color: #f8f7f7;border-radius: 8px">Validar EMAIL</a></span></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
               <tr>
                <td align="center">
                 <table bgcolor="#ffffff" class="es-footer-body" align="center" cellpadding="0" cellspacing="0" width="700">
                   <tr>
                    <td class="es-p20r es-p20l" align="left">
                     <table cellpadding="0" cellspacing="0" width="100%">
                       <tr>
                        <td width="660" align="left">
                         <table cellpadding="0" cellspacing="0" width="100%">
                           <tr>
                            <td align="center" class="es-p10t es-p10b" style="font-size:0">
                             <table border="0" width="100%" cellpadding="0" cellspacing="0">
                               <tr>
                                <td style="border-bottom: 1px solid #cccccc;background:none;height:1px;width:100%;margin:0px 0px 0px 0px"></td>
                               </tr>
                             </table></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table></td>
           </tr>
         </table>
        </div>
       </body>
      </html>`,
    });
    console.log("Email enviado correctamente");
  } catch (error) {
    console.log("No se pudo enviar el email");
    console.log(error);
  }
};

export const validateAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await User.findUnique({
      where: {
        id: parseInt(id),
        type: 3,
      },
    });
    if (!user) return res.status(400).send("El link no es válido");

    await User.update({
      where: {
        id: parseInt(id),
      },
      data: { type: 2 },
    });
    res.redirect('http://localhost:4200/signin');
  } catch (error) {
    res.status(400).send("ha ocurrido un error");
  }
};