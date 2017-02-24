package affineCipher;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.SwingUtilities;

public class AffineCipher {

    public static void main(String[] args) {
        String title = "AffineCipher";
        Scanner input = null;
        try {
            input = new Scanner(new File("AffineCipherConfiguration.ini"));
        }
        catch (FileNotFoundException ex) {
            JOptionPane.showMessageDialog(null, ex, title, JOptionPane.ERROR_MESSAGE);
            return;
        }
        long digitCoefficient = input.nextInt();
        input.nextLine();
        long digitConstant = input.nextInt();
        input.nextLine();
        long upperCoefficient = input.nextInt();
        input.nextLine();
        long upperConstant = input.nextInt();
        input.nextLine();
        long lowerCoefficient = input.nextInt();
        input.nextLine();
        long lowerConstant = input.nextInt();
        input.close();
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                JTextArea textArea = new JTextArea(20, 50);
                textArea.setLineWrap(true);
                textArea.setWrapStyleWord(true);
                JButton encrypt = new JButton("Encrypt");
                encrypt.setMnemonic(KeyEvent.VK_E);
                encrypt.addActionListener(new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        textArea.setText(encryptText(textArea.getText(), digitCoefficient,
                                digitConstant, upperCoefficient, upperConstant, lowerCoefficient, lowerConstant));
                    }
                });
                JButton decrypt = new JButton("Decrypt");
                decrypt.setMnemonic(KeyEvent.VK_D);
                decrypt.addActionListener(new ActionListener() {
                    @Override
                    public void actionPerformed(ActionEvent e) {
                        textArea.setText(decryptText(textArea.getText(), digitCoefficient,
                                digitConstant, upperCoefficient, upperConstant, lowerCoefficient, lowerConstant));
                    }
                });
                JPanel buttonPanel = new JPanel();
                buttonPanel.add(encrypt);
                buttonPanel.add(decrypt);
                JFrame frame = new JFrame(title);
                frame.add(new JScrollPane(textArea), BorderLayout.CENTER);
                frame.add(buttonPanel, BorderLayout.PAGE_END);
                frame.pack();
                frame.setLocationRelativeTo(null);
                frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
                frame.setVisible(true);
            }
        });
    }

    private static char decrypt(char c, int alphabetBeginning, int alphabetLength, long coefficient, long constant) {
        long i = c - alphabetBeginning - constant;
        while (i < 0) {
            i += alphabetLength;
        }
        while (i % coefficient != 0) {
            i += alphabetLength;
        }
        return (char) (i / coefficient + alphabetBeginning);
    }

    private static String decryptText(String s, long digitCoefficient, long digitConstant,
            long upperCoefficient, long upperConstant, long lowerCoefficient, long lowerConstant) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c >= 48 && c <= 57) {
                sb.append(decrypt(c, 48, 10, digitCoefficient, digitConstant));
            }
            else if (c >= 65 && c <= 90) {
                sb.append(decrypt(c, 65, 26, upperCoefficient, upperConstant));
            }
            else if (c >= 97 && c <= 122) {
                sb.append(decrypt(c, 97, 26, lowerCoefficient, lowerConstant));
            }
            else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    private static char encrypt(char c, int alphabetBeginning, int alphabetLength, long coefficient, long constant) {
        return (char) ((((c - alphabetBeginning) * coefficient + constant) % alphabetLength) + alphabetBeginning);
    }

    private static String encryptText(String s, long digitCoefficient, long digitConstant,
            long upperCoefficient, long upperConstant, long lowerCoefficient, long lowerConstant) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c >= 48 && c <= 57) {
                sb.append(encrypt(c, 48, 10, digitCoefficient, digitConstant));
            }
            else if (c >= 65 && c <= 90) {
                sb.append(encrypt(c, 65, 26, upperCoefficient, upperConstant));
            }
            else if (c >= 97 && c <= 122) {
                sb.append(encrypt(c, 97, 26, lowerCoefficient, lowerConstant));
            }
            else {
                sb.append(c);
            }
        }
        return sb.toString();
    }
}