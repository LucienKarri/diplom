package com.transportsolution.transportsolution.service;

import java.io.IOException;
import org.springframework.stereotype.Service;
import com.itextpdf.io.font.FontProgram;
import com.itextpdf.io.font.FontProgramFactory;
import com.itextpdf.io.font.PdfEncodings;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.Leading;
import com.itextpdf.layout.properties.Property;
import com.itextpdf.layout.properties.TextAlignment;

@Service
public class PDFServiceImpl implements PDFService {


        public static final String FONT = "/fonts/TimesNewRoman.ttf";

        public void createPdf() throws IOException {
                String path = "order.pdf";

                FontProgram fontProgram = FontProgramFactory.createFont(FONT);
                PdfFont pdfFont = PdfFontFactory.createFont(fontProgram, PdfEncodings.IDENTITY_H);
                PdfWriter pdfWriter = new PdfWriter(path);
                PdfDocument pdfDocument = new PdfDocument(pdfWriter);
                pdfDocument.setDefaultPageSize(PageSize.A4);


                Document document = new Document(pdfDocument);

                document.setFont(pdfFont);
                document.setProperty(Property.LEADING, new Leading(Leading.MULTIPLIED, 1f));
                document.add(new Paragraph("Договор на аренду и лизинг")
                                .setTextAlignment(TextAlignment.CENTER).setBold());
                document.add(new Paragraph(
                                "Договор аренды и лизинга грузового транспортного средства")
                                                .setBold());

                document.add(new Paragraph("Город: Москва\n" + "Дата: ${date}\n"));

                document.add(new Paragraph("Арендодатель: ООО \"Транспортные Решения\"\n"
                                + "Адрес: г.Москва, ул.Ленина, д.10\n"
                                + "Телефон: +7 (495) 123-45-67\n"
                                + "Email: info@transsolutions.ru\n"));

                document.add(new Paragraph("Арендатор: ${fullName}\n" + "Компания: ${companyName}\n"
                                + "Адрес: ${companyAdress}\n" + "Телефон: ${contactPhone}\n"
                                + "Email: ${contactEmail}\n"));

                document.add(new Paragraph("Транспортное средство:\n" + "Марка: ${brand}\n"
                                + "Модель: ${contactEmail}\n" + "Год выпуска: ${contactEmail}\n"
                                + "Грузоподъемность: ${contactEmail}\n"
                                + "Тип топлива: ${contactEmail}\n"
                                + "Мощность двигателя: ${contactEmail}\n"
                                + "Трансмиссия: ${contactEmail}\n"
                                + "Габариты: ${contactEmail}\n"));


                document.add(new Paragraph("1. Предмет договора \n"
                                + "1.1. Арендодатель предоставляет Арендатору во временное пользование грузовое транспортное средство, указанное в настоящем договоре, на условиях аренды и лизинга.\n"
                                + "1.2. Транспортное средство передается Арендатору в технически исправном состоянии, соответствующем требованиям законодательства Российской Федерации."));

                document.add(new Paragraph("2. Срок аренды\n"
                                + "2.1. Срок аренды составляет 12 месяцев, начиная с 20 мая 2024 года и заканчивая 19 мая 2025 года."));

                document.add(new Paragraph("3. Стоимость и порядок расчетов\n"
                                + "3.1. Ежемесячная арендная плата составляет 150 000 рублей.\n"
                                + "3.2. Полная стоимость аренды за весь срок составляет 1 800 000 рублей.\n"
                                + "3.3. Арендатор обязуется производить оплату ежемесячных платежей до 5-го числа каждого месяца."));
                document.add(new Paragraph());

                document.add(new Paragraph("4. Права и обязанности сторон\n"
                                + "4.1. Арендодатель обязуется: передать транспортное средство в технически исправном состоянии. Обеспечивать техническое обслуживание транспортного средства в течение срока аренды.\n"
                                + "4.2. Арендатор обязуется: использовать транспортное средство исключительно в целях, предусмотренных настоящим договором. Соблюдать все требования по эксплуатации транспортного средства, предусмотренные законодательством и инструкциями Арендодателя. Своевременно вносить арендные платежи."));

                document.add(new Paragraph("5. Ответственность сторон\n"
                                + "5.1. В случае невыполнения или ненадлежащего выполнения условий настоящего договора стороны несут ответственность в соответствии с действующим законодательством Российской Федерации."));

                document.add(new Paragraph("6. Прочие условие\n"
                                + "6.1. Все изменения и дополнения к настоящему договору действительны только в случае, если они выполнены в письменной форме и подписаны обеими сторонами.\n"
                                + "6.2. Настоящий договор составлен в двух экземплярах, имеющих одинаковую юридическую силу, по одному для каждой из сторон.\n\n"));



                document.add(new Paragraph("Подписи сторон\n\n" + "Иванов Иван Иванович\n\n"
                                + "(Арендатор)    _____________\n\n" + "Петров Петр Петрович\n\n"
                                + "(Арендодатель) _____________\n\n\n\n"));


                float[] width = {5, 5};
                Table table = new Table(width).useAllAvailableWidth();

                // Добавление заголовков столбцов
                document.add(new Paragraph("Контрольная таблица").setBold());
                table.addCell("Название поля");
                table.addCell("Значения");
                table.addCell("Арендодатель");
                table.addCell("ООО \"Транспортные Решения\"");
                table.addCell("Адрес арендодателя");
                table.addCell("г.Москва, ул.Ленина, д.10");
                table.addCell("Телефон арендодателя");
                table.addCell("+7 (495) 123-45-67");
                table.addCell("Email арендодателя");
                table.addCell("info@transsolutions.ru");
                table.addCell("Арендатор");
                table.addCell("sddasdeqweqwe213123ada");
                table.addCell("Компания арендатора");
                table.addCell("sddasdada");
                table.addCell("Адрес арендатора");
                table.addCell("sddasdeqweqwe213123ada");
                table.addCell("Телефон арендатора");
                table.addCell("sddasdada");
                table.addCell("Email арендатора");
                table.addCell("sddasdeqweqwe213123ada");
                table.addCell("Марка ТС");
                table.addCell("sddasdada");
                table.addCell("Модель ТС");
                table.addCell("sddasdeqweqwe213123ada");
                table.addCell("Год выпуска ТС");
                table.addCell("sddasdada");
                table.addCell("Грузоподъемность ТС");
                table.addCell("sddasdeqweqwe213123ada");
                table.addCell("Тип топлива ТС");
                table.addCell("sddasdada");
                table.addCell("Мощность двигателя ТС");
                table.addCell("sddasdeqweqwe213123ada");
                table.addCell("Трансмиссия ТС");
                table.addCell("sddasdada");
                table.addCell("Габариты ТС (Д х Ш х В)");
                table.addCell("sddasdeqweqwe213123ada");
                table.addCell("Срок аренды");
                table.addCell("sddasdada");
                table.addCell("Ежемесячная арендная плата");
                table.addCell("sddasdeqweqwe213123ada");
                table.addCell("Полная стоимость аренды");
                table.addCell("sddasdada");
                table.addCell("Дата начала аренды");
                table.addCell("sddasdeqweqwe213123ada");
                table.addCell("Дата окончания аренды");
                table.addCell("sddasdada");



                document.add(table);

                document.close();
        }

}
