/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Swal from "sweetalert2";

const Contact = {
  async render() {
    return `
    <section class="contact">
      <div class="container">
        <div class="row">
        
          <div class="heading-contact col col-sm-6 text-center">
            <h2>Get in Touch</h2>
            <p>Feel free to reach out if you have any questions, suggestions, or collaboration opportunities. We are here to assist you with pleasure.</p>
            
          </div>

          <div class="col col-sm-6">

            <form>
              <div class="form-contact">
                <div class="mb-3">
                  <input type="text" class="form-control" id="subject" placeholder="Subject">
                </div>
                  <div class="mb-3">
                    <input type="text" class="form-control" id="name" placeholder="Your Name">
                  </div>
                  <div class="mb-3">
                    <input type="email" class="form-control" id="email" placeholder="Email*">
                  </div>
                  <div class="mb-3">
                    <input type="number" class="form-control" id="phone" placeholder="Phone Number*">
                  </div>

                  <div class="mb-3">
                    <textarea class="form-control" id="yourMessage" rows="3" placeholder="Your message..."></textarea>
                  </div>

                </div>

                <div class="d-grid gap-2">
                  <button class="btn-contact btn" type="submit">Send Message</button>
                </div>

              </div>
            </form>
          </div>
      </div>
    </section>
    `;
  },

  async afterRender() {
    const form = document.querySelector("form");
    const fullName = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const yourMessage = document.getElementById("yourMessage");
    const subject = document.getElementById("subject");

    function sendEmail() {
      if (
        !fullName.value ||
        !email.value ||
        !phone.value ||
        !yourMessage.value ||
        !subject.value
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all required fields!",
          color: "#00214D",
          confirmButtonColor: "#00EBC7"
        });
        return;
      }
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to send this email?",
        color: "#00214D",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00EBC7",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, send it!"
      }).then(result => {
        if (result.isConfirmed) {
          const bodyMessage = `
            <div style="font-family: 'Arial', sans-serif; padding: 10px; background-color: #f5f5f5;">
              <h2 style="color: #00214D;">Contact Form</h2>
              <hr style="border: 1px solid #00214D;">
              <p><strong style="color: #00214D;">Name:</strong> ${fullName.value}</p>
              <p><strong style="color: #00214D;">Email:</strong> ${email.value}</p>
              <p><strong style="color: #00214D;">Phone:</strong> ${phone.value}</p>
              <p><strong style="color: #00214D;">Subject:</strong> ${subject.value}</p>
              <p style="color: #00214D;"><strong>Message:</strong></p>
              <p style="padding: 10px; border: 1px solid #00214D; background-color: #ffffff;">
                ${yourMessage.value}
              </p>
              <p style="color: #00214D; margin-top: 20px;">Thank you for contacting us!</p>
            </div>
          `;
          Email.send({
            Host: "smtp.elasticemail.com",
            Username: "mifthah.pbgame1@gmail.com",
            Password: "03450C1208D896F2009311AF96005E577807",
            To: "mifthah.pbgame1@gmail.com",
            From: "mifthah.pbgame1@gmail.com",
            Subject: subject.value,
            Body: bodyMessage
          }).then(() => {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Mail sent successfully!",
              color: "#00214D",
              confirmButtonText: "OK",
              confirmButtonColor: "#00EBC7"
            }).then(() => {
              window.location.reload();
              console.log("User clicked OK");
            });
          });
        }
      });
    }

    form.addEventListener("submit", e => {
      e.preventDefault();
      sendEmail();
    });
  }
};

export default Contact;
