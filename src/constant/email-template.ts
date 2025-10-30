import moment from "moment";


const populateMail = (content: any) => {
    return (
        `
            <html>
                <head>
                    <style>
                        .container {
                            background-color: #8652A44D;
                            width: 100%;
                            min-height: 50vh;
                            display: flex;
                            justify-content: center;
                        }
                        
                        .main-content {
                            background-color: #ffffff;
                            width: 40%;
                            margin: 1rem auto;
                            padding: .5rem;
                            min-height: 150px;
                            border-radius: 5px;
                            font-family: 'Montserrat';
                        }
                        
                        .content {
                            padding: 20px 40px;
                        }
                        
                        .btn {
                            background-color: #5A4A3F;
                            padding: .7rem 0;
                            border-radius: 50px;
                            color: #ffffff;
                            border: none;
                            text-decoration: none;
                            text-align: center;
                            width: 100%;
                        }
                        
                        .header {
                            display: flex;
                            justify-content: center !important;
                            border-bottom: 1px solid #d1d7db;
                            min-height: 50px;
                            padding: 1rem 0;
                        }
                        
                        .title {
                            color: #18181B;
                            font-family: 'Montserrat';
                            font-size: 16px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 150%; /* 24px */
                        }
                        
                        .emailText {
                            color: #55A9F8;
                            font-family: 'Montserrat';
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 500;
                        }

                        @media screen and (max-width: 600px) {
                            .main-content {
                                width: 80% !important;
                            }
                            .content {
                                padding: 10px 20px;
                            }
                            .title {
                                font-size: 14px;
                            }
                            .emailText {
                                font-size: 14px;
                            }
                            
                            p {
                                font-size: 11px
                            }
                            
                            table, tr, th, td{
                                font-size: 12px;
                            }
                        }
                    
                    </style>
                </head>

                <body>
                    <div class="container"
                        style="
                            background-color: #fff9ef;
                            width: 100%;
                            min-height: 50vh;
                            display: flex;
                            justify-content: center;
                        "
                    >
                        <div class="main-content">
                        
                            <div class="header" 
                                style="
                                    display: flex;
                                    justify-content: center !important;
                                    border-bottom: 1px solid #d1d7db;
                                    min-height: 50px;
                                    padding: 1rem 0;
                                "
                            >
                                <img 
                                    src="https://www.b-browstudio.uk/_next/image?url=%2Fimages%2Flogo.png&w=128&q=75" 
                                    width="50px" 
                                    height="40px" 
                                    alt="logo" 
                                    style="margin: 0 auto;" 
                                />
                            </div>

                            <style>
                                @media (max-width: 600px) {
                                    div[class="main-content"] {
                                        width: 90% !important;
                                        margin: 1rem auto;
                                    }
                                    img[width="100px"]{
                                        width: 60px !important;
                                        height: 30px !important;
                                    }
                                }
                            </style>

                            <div
                                class="content" 
                                style="
                                    padding: 10px 20px;
                                "
                            >
                                ${ content }
                            
                            </div>
                            
                        </div>
                    </div>
                </body>
            </html>
        
        `
    )
}


export const appointmentEmailTemplate = (appointment: any, recipient: any, isAdmin: boolean) => {
    const content = !isAdmin ? 
    `
        <div>
            <p 
                style="
                    color: #18181B;
                    font-family: 'Montserrat';
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 150%;
                "
            >
                ${ recipient ? 'Hi '  +  recipient.firstName + ' ' + recipient.lastName : 'Dear Customer' }
            </p>
            
            <p 
                style="
                    color: #18181B;
                    font-family: 'Montserrat';
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 150%;
                "
            >you have successfully created an appointment with the following details</p>
            
            <div style="margin: 1rem 0 .5rem 0; font-size: 12px;">
            
                <table>
                    <tr 
                        style="
                            color: #18181B;
                            font-family: 'Montserrat';
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 150%;
                        "
                    >
                        <th style="text-align: left; font-size: 12px;">Service:</th>
                        <td style="font-size: 12px; color: #5A4A3F;">${ appointment ? appointment?.productService?.title : '--'}</td>
                    </tr>
                    <tr     
                        style="
                            color: #18181B;
                            font-family: 'Montserrat';
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 150%;
                        "
                    >
                        <th style="text-align: left; font-size: 12px;">Appointment Day:</th>
                        <td style="font-size: 12px; color: #5A4A3F;">${ appointment ? moment(appointment.appointmentDay).format('DD/MM/YYYY') : '--'}</td>
                    </tr>
                    <tr     
                        style="
                            color: #18181B;
                            font-family: 'Montserrat';
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 150%;
                        "
                    >
                        <th style="text-align: left; font-size: 12px;">Appointment Time:</th>
                        <td style="font-size: 12px; color: #5A4A3F;">${ appointment ? moment(appointment.appointmentTime) : '--'}</td>
                    </tr>
                    <tr 
                        style="
                            color: #18181B;
                            font-family: 'Montserrat';
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 150%;
                        "
                    style="font-size: 12px; color: #5A4A3F;">
                        <th style="text-align: left; font-size: 12px;">Amount:</th>
                        <td style="font-size: 12px; color: #5A4A3F;">${appointment.currencySymbol || '$'} ${ appointment ? appointment.amountPaid : '--'}</td>
                    </tr>
                    <tr 
                        style="
                            color: #18181B;
                            font-family: 'Montserrat';
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 150%;
                        "
                    >
                        <th style="text-align: left; font-size: 12px;">Appointment Created On:</th>
                        <td style="font-size: 12px; color: #5A4A3F;">${ appointment ? moment(appointment.createdAt).format('DD/MM/YYYY HH:mm:ss') : '--'}</td>
                    </tr>
                </table>
            </div>
            
            <p style="color: #18181B;">We are excited to have you with us!</p>
            
            <p style="color: #18181B;">
                contact us via our email 
            <span 
                style="
                    color: #55A9F8;
                    font-family: 'Montserrat';
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 500;
                    margin: .5rem 0;
                "
            >B-Browstudio@outlook.com</span> if you have any issues with this transaction or Click on the link below to chat with our admin
            </p>
            
            <br/>
            
            <div style="display: flex; justify-content: center; width: 100%; margin: .85rem 0;">
                <a href="https://wa.me/2347031625759" target="_blank" class="btn" 
                    style="
                        background-color: #5A4A3F;
                        padding: .7rem 0;
                        border-radius: 50px;
                        color: #ffffff;
                        border: none;
                        text-decoration: none;
                        text-align: center;
                        width: 100%;
                    "
                >
                    Chat via whatsapp
                </a>
            </div>
        </div>
    ` :

    `
        <div>
            <p class="title">
                Dear Admin, an appointment with the following details has been created
            </p>
                 
            <div style="margin: 1rem 0 .5rem 0;">
                <table>
                    <tr 
                        style="
                            color: #18181B;
                            font-family: 'Montserrat';
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 150%;
                        "
                    >
                        <th style="text-align: left; font-size: 12px;">Client:</th>
                        <td style="font-size: 12px; color: #5A4A3F;">
                            ${ recipient ? 
                                recipient?.firstName + ' ' + recipient?.lastName : '--'}
                        </td>
                    </tr>
                    <tr 
                        style="
                            color: #18181B;
                            font-family: 'Montserrat';
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 150%;
                        "
                    >
                        <th style="text-align: left; font-size: 12px;">Service:</th>
                        <td style="font-size: 12px; color: #5A4A3F;">${ appointment ? appointment?.productService?.title : '--'}</td>
                    </tr>
                    <tr     
                        style="
                            color: #18181B;
                            font-family: 'Montserrat';
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 150%;
                        "
                    >
                        <th style="text-align: left; font-size: 12px;">Appointment Day:</th>
                        <td style="font-size: 12px; color: #5A4A3F;">${ appointment ? moment(appointment.appointmentDay).format('DD/MM/YYYY') : '--'}</td>
                    </tr>
                    <tr     
                        style="
                            color: #18181B;
                            font-family: 'Montserrat';
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 150%;
                        "
                    >
                        <th style="text-align: left; font-size: 12px;">Appointment Time:</th>
                        <td style="font-size: 12px; color: #5A4A3F;">${ appointment ? moment(appointment.appointmentTime) : '--'}</td>
                    </tr>
                    <tr
                        style="
                            color: #18181B;
                            font-family: 'Montserrat';
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 150%;
                        "
                    >
                        <th style="text-align: left; font-size: 12px;">Amount:</th>
                        <td style="font-size: 12px; color: #5A4A3F;">${appointment.currencySymbol || '$'} ${ appointment ? appointment.amountPaid : '--'}</td>
                    </tr>
                    <tr
                        style="
                            color: #18181B;
                            font-family: 'Montserrat';
                            font-size: 12px;
                            font-style: normal;
                            font-weight: 600;
                            line-height: 150%;
                        "
                    >
                        <th style="text-align: left; font-size: 12px;">Date/Time:</th>
                        <td style="font-size: 12px; color: #5A4A3F;">${ appointment ? moment(appointment.createdAt).format('DD/MM/YYYY HH:mm:ss') : '--'}</td>
                    </tr>
                </table>
            </div>
        
            <p style="color: #18181B; font-size: 12px;">Please, proceed to your dashboard to confirm this appointment. Thank you.</p>
        
        </div>
    `
    return populateMail(content);
}


export const verificationEmail = (userData: any) => {
    const content = `
        <p>
            Dear esteemed customer your account has been created successfully. Your verification code is <b> ${ userData.code }</b>
        
            We are happy to have you onboard, kindly use link below to begin enjoying our services <br>
            <a href="${`https://chinosexchange.com/verify/${userData.code}`}" target="_blank">${`https://chinosexchange.com/verify/${userData.code}`}</a><br>
            Thank you for trusting us.
        </p>
    `;

    return populateMail(content);
}

export const resetPasswordEmail = (userData: any, resetCode: string) => {
    const content = `
        <p>
            Dear customer ${userData.firstName || ""} ${ userData.lastName || "" }, your password reset code is <strong>${resetCode}</strong>
        </p>
        <br>
        <p>
            If you did not initiate this action pls ensure to secure your account and possibly contact support for further assistance.
        </p>
    `;

    return populateMail(content);
}