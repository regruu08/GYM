import Link from "next/link";
export const metadata = { title: "Privacy & website information" };
export default function Privacy() {
  return (
    <article className="editorial-page">
      <header className="editorial-heading">
        <span className="editorial-label">WEBSITE INFORMATION</span>
        <h1>
          Your information.
          <br />
          <em>Handled with care.</em>
        </h1>
        <p>How the features on this website use the information you enter.</p>
      </header>
      <div className="article-body">
        <h2>Enquiries</h2>
        <p>
          The enquiry form prepares an email in your browser. It does not submit
          your details to a booking system or reserve a visit. Choosing “Open
          email to send” passes the draft to your email application. You decide
          whether to send it. Your email provider’s privacy terms then apply.
        </p>
        <h2>Fitness calculator</h2>
        <p>
          Calculator inputs are processed in your browser and are not saved by
          this application. Results are general estimates, not a diagnosis or an
          individual nutrition prescription. Avoid entering sensitive health
          information into the enquiry form.
        </p>
        <h2>Storage and third parties</h2>
        <p>
          This application does not set advertising cookies or store form inputs
          in local storage. The hosting provider may process request logs. Stock
          photography is hosted with this website. External links and email
          providers have their own privacy practices.
        </p>
        <h2>Availability and bookings</h2>
        <p>
          Published schedules and prices are informational. Confirm current
          availability, membership terms, and visit arrangements directly with
          the team. An email draft is not a booking confirmation.
        </p>
        <h2>Questions</h2>
        <p>
          Use the <Link href="/contact">contact page</Link> to ask about this
          website or your enquiry.
        </p>
      </div>
    </article>
  );
}
