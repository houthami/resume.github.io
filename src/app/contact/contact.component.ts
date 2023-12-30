import { Component, OnInit } from "@angular/core";
import {
  faEnvelope, faPhone, faTimes,
  faMapMarkerAlt, IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormControl, Validators } from "@angular/forms"; 
import * as emailjs from 'emailjs-com';
import { Contact } from "../model/contact.model";
import { environment } from '../../environments/environment';

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss", "./contact.component.responsivity.scss"]
})

export class ContactComponent implements OnInit {

  name: string;
  email: string;
  phone: string;
  location: string;

  faEnvelope: IconDefinition;
  faPhone: IconDefinition;
  faMapMarkerAlt: IconDefinition;
  faTimes: IconDefinition;

  isLoading: boolean = false;
  hasBeenSubmited: boolean = false;
  feedbackStatus: string;
  private emailjsServiceId = 'service_49s0hnq';
  private emailjsTemplateId = 'template_bs95oqd';

  constructor() { }

  contactForm: FormGroup = new FormGroup({
    name: new FormControl("",[
      Validators.required,
      Validators.pattern("[A-zÀ-ú ]*")
    ]),
    email: new FormControl("",[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    ]),
    message: new FormControl("",[
      Validators.required
    ])
  });

  get senderEmail() {
    return this.contactForm.get("email")
  }

  get senderName() {
    return this.contactForm.get("name")
  }

  get senderMessage() {
    return this.contactForm.get("message")
  }

  get options() {
    return this.contactForm.get("options")
  }

  ngOnInit(): void {
    const personalData = environment.personal;
    this.name = personalData.name;
    this.email = personalData.email;
    this.phone = personalData.phone;
    this.location = personalData.location;

    this.faEnvelope = faEnvelope;
    this.faPhone = faPhone;
    this.faMapMarkerAlt = faMapMarkerAlt;
    this.faTimes = faTimes;
  }

  sendEmail(data: any) {
    console.log("fghj", data)
    var dataMail = {
      service_id: 'service_49s0hnq',
      template_id: 'template_bs95oqd',
      user_id: '0ByY2_CFjULhXPkJ4',
      template_params: {
          'to_name': 'James',
          'reply_to': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
      }
  };
    emailjs.send(
      this.emailjsServiceId,
      this.emailjsTemplateId,
      { 
        ...data,
        'to_name': 'Houthami',
        'from_name': data.name,
        'from_mail': data.email,
        'message': data.message,
        'reply_to': '03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...'
    },'0ByY2_CFjULhXPkJ4'
    ).then(
      (response) => {
        console.log('Email sent successfully:', response);
        this.displayUserInterfaceMessage(true);
      },
      (error) => {
        console.error('Error sending email:', error);
        this.displayUserInterfaceMessage(false);
      }
    );
  } 

  displayUserInterfaceMessage(hasBeenSuccessfuly: boolean) {
    this.isLoading = false;
    this.hasBeenSubmited = true;
    this.feedbackStatus = hasBeenSuccessfuly? "success" : "error";
    this.contactForm.reset();
  }

  closeFeedbackMessage() {
    this.hasBeenSubmited = false;
    this.feedbackStatus = "";
  }

  onSubmit(contactForm) {
    this.isLoading = true;

    const contactValues: Contact = {
      name: this.senderName.value,
      email: this.senderEmail.value,
      message: this.senderMessage.value,
      date: new Date()
    } as Contact;
    console.log("mail : ", this.senderName.value);
    
    this.sendEmail(contactValues); 
  }
}
