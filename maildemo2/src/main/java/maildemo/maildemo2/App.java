package maildemo.maildemo2;

/**
 * Hello world!
 *
 */
public class App 
{
	public static void main(String[] args) {

        GEmailer gEmailSender = new GEmailer();
        String to = "kaushik99sam@gmail.com";
        String from = "kausik99sam@gmail.com";
        String subject = "Second: Sending email using GMail";
        String text = "This is a example email send by me";
        boolean b = gEmailSender.sendEmail(to, from, subject, text);
        if (b) {
            System.out.println("Email is sent successfully");
        } else {
            System.out.println("There is problem in sending email");
        }

    }
}
