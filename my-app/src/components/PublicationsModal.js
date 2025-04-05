import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faGlobe, faFlag } from '@fortawesome/free-solid-svg-icons';

const PublicationsModal = ({ isOpen, onClose }) => {
  const internationalPublications = [
    "1. Donder, E., G. Baydas, Y. Ozkan, E. Ercel, M. Yalniz and H. Dogan, \"Investigation of Antioxidant Effect of Melatonin Against Carbon Tetrachloride Toxicity in Various Tissues\", Biomed Res., 10 (2):141-145 (1999).",
    "2. Ozkan, Y., E. Donder, G. Baydas, H. Dogan, N. Ilhan, and Y. Acik, \"Prevalence of Type 2 Diabetes Mellitus and Impaired Glucose Tolerance Among  30 years of age In An Urban Community of Elazıg\", Biomed Res., 10 (3):181-189 (1999).",
    "3. Yilmaz, O., Y. Ozkan, M.  Yildirim, A. I. Ozturk, Y. Ersan, \"Effects of alpha lipoic acid, ascorbic acid-6-palmitat, and fish oil on the Glutathione, Malonaldehyde, and fatty acids levels in erytrocytes of streptozotocin induced diabetic male rats\", Journal of celluler Biochemistry,  86:530-539 (2002).",
    "4. Serhatlioglu, S., Z. Bozgeyik, Y. Ozkan, F. Hardalac and A. Guler, \"Neurofuzzy Classification of the Effect of Diabetes Mellitus on Carotid Artery\", Journal of Medical Systems,  27,5:457-464 (2003).",
    "5. Aydin, S., I. Halifeoglu, I. H. Ozercan, F. Erman, N. Kilic, S. Aydin, N. Ilhan, N. Ilhan, Y. Ozkan, N. Akpolat, L. Sert and E. Caylak, \"A comparison of leptin and ghrelin levels in plasma and saliva of young healthy subjects\", Peptides, 26,4:647-652 (2005).",
    "6. Ozkan Y., R. Colak, \"Sheehan Syndrome: Clinical and laboratory evaluation of 20 cases\", Neuro Endocrinol Lett, 26,3:257-60 (2005).",
    "7. Ozgocmen, S., S. Bulut, N. Ilhan, A. Gulkesen, O. Ardıcoglu, Y. Ozkan, \"Vitamin D deficiency and reduced bone mineral density in multiple sclerosis: effect of ambulatory status and functional capacity\", J Bone Miner Metab, 23,4:309-13 (2005).",
    "8. Ozcelik, O., Y. Ozkan, F. Karatas, H. Kelestimur, \"Exercise training as an adjunct to orlistat therapy reduces oxidative stress in obese subjects\", Tohoku J Exp Med, 206,4:313-8 (2005).",
    "9. Ozkan Y., O. Yilmaz, AI. Ozturk, Y. Ersan, \"Effects of triple antioxidant combination (vitamin E, vitamin C and alpha-lipoic acid) with insulin on lipid and cholesterol levels and fatty acid composition of brain tissue in experimental diabetic and non-diabetic rats\", Cell Biol Int, 29,9:754-760 (2005).",
    "10. Colak, R., Y. Ozkan, S. O. Erdogan, Y. Saral,  I. Halifeoglu, \"A Comparison Between The Effects Of Low (1 µg) And Standard Dose (250 µg) ACTH Stimulation Tests On Adrenal Cortex Functions With Leprosy Patients\", Endocrine Research, 31,4:325–333, (2005).",
    "11. Ozkan, Y., E. Donder, H. Guney, G. Baydas, \"Changes in plasma homocysteine levels of rats with experimentally induced hypothyroidism and hyperthyroidism\" Neuro Endocrinol Lett, 26,5: 536-40, (2005).",
    "12. Aydın, S., S. Aydın, Y. Ozkan, S. Kumru, \"Ghrelin is present in human colostrum, transitional and mature milk\", Peptides, 27,878-882, (2006).",
    "13. Colak, R., Y. Ozkan, S. U. Cengiz, Y. Saral, B. C. Kandi, I. Halifeoglu, \"A Comparison Between The Effects Of Low (1 µG) And Standard Dose (250 µG) ACTH Stimulation Tests On Adrenal Cortex Functions With Behçet's Disease\", Journal of the European Academy of Dermatology and Venereology Jul;20(6):721-5. (2006).",
    "14. Aydin, S., H. Geckil, F. Zengin, I. H. Ozercan, F. Karatas, S. Aydin, D. T. Balik, Y. Ozkan, F. Dagli and V. Celik, \"Ghrelin in plants: What is the function of an appetite hormone in plants?\", Peptides, Jul;27(7):1597-602, (2006).",
    "15. Aydin, S., I. H. Ozercan, S. Aydin, Y. Ozkan, F. Dagli, F. Oguzoncul, \"Biological rhythm of saliva ghrelin in human\", Biological Rhythm Research, 37(2):169-172, (2006).",
    "16. Aydin S, Geckil H, Karatas F, Donder E, Kumru S, Kavak EC, Colak R, Ozkan Y, Sahin I. Milk and blood ghrelin level in diabetics. Nutrition. 2007 Nov-Dec;23(11–12):807–11.",
    "17. Aydin S, Ozkan Y, Erman F, Gurates B, Kilic N, Colak R, Gundogan T, Catak Z, Bozkurt M, Akin O, Sen Y, Sahin I. Presence of obestatin in breast milk: Relationship among obestatin, ghrelin, and leptin in lactating women. Nutrition. 2008 Jul-Aug;24(7–8):689–93.",
    "18. Karatas F, Aydin S, Kaygusuzoglu E, Yildiz H, Erulas FA, Ozkan Y. Ghrelin and orotic acid increased in subclinical mastitis. Arch Physiol Biochem. 2008 Jul;114(3):178–82.",
    "19. Özkan, Y., Yılmaz Ö, Tuzcu M, Murat G, Güvenç M, Öztürk Aİ, Sahin K. Effects of dietary taurine and gamma aminobutyric acid on the steroil CoA desaturase and ∆6, 5 desaturase enzyme activites in liver tissues of rats. J. Anim. Vet. Adv., 2008, 7(11):1450-1457.",
    "20. Karaoglu A, Aydin S, Dagli AF, Cummings DE, Ozercan IH, Canatan H, Ozkan Y. Expression of obestatin and ghrelin in papillary thyroid carcinoma. Mol Cell Biochem. 2009, 323:113–118.",
    "21. Bozgeyik Z, Coskun S, Dagli AF, Ozkan Y, Sahpaz F, Ogur E. Diffusion-weighted MR imaging of thyroid nodules. Neuroradiology. 2009 Mar;51(3):193-8.",
    "22. Orhan Kursat Poyrazoglu, Yusuf Ozkan, Mehmet Ozden, Ramis Colak, Goksel Ozalp and Emir Dönder. L-Thyroxine Treatment of Patients with Subclinical Hypothyroidism Reduce Inflammation. The Open Endocrinology Journal, 2009, 3, 34-37",
    "23. Aydin S, Dag E, Ozkan Y, Erman F, Dagli AF, Kilic N, Sahin I, Karatas F, Yoldas T, Barim AO, Kendir Y. Nesfatin-1 and ghrelin levels in serum and saliva of epileptic patients: hormonal changes can have a major effect on seizure disorders. Mol Cell Biochem. 2009 Aug;328(1-2):49-56.",
    "24. Ozkan Y, Aydin S, Donder E, Koca SS, Aydin S, Ozkan B, Sahin I. Effect of orlistat on the total ghrelin and leptin levels in obese patients. J Physiol Biochem. 2009 Sep;65(3):215-23.",
    "25. Alnema MM, Aydin S, Ozkan Y, Dagli AF, Ozercan HI, Yildirim N, Sahin I, Karaoglu A, Kilic N, Yilmaz M, Ozercan MR, Donder E. Ghrelin and obestatin expression in oral squamous cell carcinoma: an immunohistochemical and biochemical study. Mol Cell Biochem (2010) 339:173–179.",
    "26. Dag E, Aydin S, Ozkan Y, Erman F, Dagli AF, Gurger M. Alteration in chromogranin A, obestatin and total ghrelin levels of saliva and serum in epilepsy cases. Peptides 31 (2010) 932–937.",
    "27. Emir DÖNDER, Yusuf ÖZKAN, Vedat GENÇER, Gıyaseddin BAYDAŞ. Gebelik Döneminde Oluşturulan Deneysel Hipotiroidinin Onuncu, On Beşinci Gestasyonel Gün ve Yenidoğandaki Fetal Beyin Dokusunda GFAP ve S100B Protein Ekspresyonuna Etkisi. Turkiye Klinikleri J Med Sci 2010;30(2):462-8.",
    "28. Emir DÖNDER, Yusuf ÖZKAN, Said DAĞ, Gıyaseddin BAYDAŞ. Gebeliğin Birinci, İkinci ve Üçüncü Trimesterlerinde Oluşturulan Deneysel Hipotiroidinin Nöral Plastisite ve Öğrenmeye Etkisi. Turkiye Klinikleri J Med Sci 2010;30(5):1524-32.",
    "29. Aydin, S., A.F. Dagli, Y. Ozkan, Y. Kendir, İ. Sahin, A. Aksoy, and İ.H. Ozercan, \"Immunohistochemical and quantitative analysis of ghrelin in Syzygium aromaticum,\" Cell Biol Int. 2011 May 1;35(5):437-41.",
    "30. Aydin, S., E. Dag, Y. Ozkan, O. Arslan, G. Koc, S. Bek, S. Kirbas, T. Kasikci, D. Abasli, Z Gokcil, Z. Odabasi and Z. Catak, \"Time-dependent changes in the serum levels of prolactin, nesfatin–1 and ghrelin as a marker of epileptic attacks young male patients,\" Peptides. 2011 Jun;32(6):1276-80.",
    "31. Sahin, İ., S. Aydin, Y. Ozkan, A.F. Dagli, K.O. Akin, S.P. Guzel, Z. Catak and M.R. Ozercan, \"Diet-induced obesity suppresses ghrelin in rat gastrointestinal tract and serum,\"  Mol Cell Biochem. 2011 Sep;355(1-2):299-308.",
    "32. Aydin S, Sahin I, Ozkan Y, Dag E, Gunay A, Guzel SP, Catak Z, Ozercan MR. Examination of the tissue ghrelin expression of rats with diet-induced obesity using radioimmunoassay and immunohistochemical methods. Mol Cell Biochem. 2012 Jun;365(1-2):165-73.",
    "33. Onur MR, Yalnız M, Poyraz AK, Özercan IH, Ozkan Y. Pancreatic islet cell amyloidosis manifesting as a large pancreas. Korean J Radiol. 2012 Jan-Feb;13(1):94-7.",
    "34. Yilmaz O, Ersan Y, Dilek Ozsahin A, Ihsan Ozturk A, Ozkan Y. Consequences of the Combined α-tocopherol, Ascorbic Acid and α-lipoic Acid on the Glutathione, Cholesterol and Fatty Acid Composition in Muscle and Liver of Diabetic Rats. Iran J Basic Med Sci. 2013 Feb;16(2):165-72.",
    "35. Akyay A, Cihangiroglu G, Özkan Y, Deveci U, Bahceci S, Çetinkaya Z. Primary hyperparathyroidism as an extremely rare cause of secondary myelofibrosis in childhood. J Pediatr Endocrinol Metab. 2013;26(11-12):1185-8.",
    "36. Ozkan Y, Timurkan ES, Aydin S, Sahin I, Timurkan M, Citil C, Kalayci M, Yilmaz M, Aksoy A, Catak Z. Acylated and desacylated ghrelin, preptin, leptin, and nesfatin-1 Peptide changes related to the body mass index. Int J Endocrinol.2013;2013:236085.",
    "37. Kotan LD, Hutchins BI, Ozkan Y, Demirel F, Stoner H, Cheng PJ, Esen I, Gurbuz F, Bicakci YK, Mengen E, Yuksel B, Wray S, Topaloglu AK. Mutations in FEZF1 cause Kallmann syndrome. Am J Hum Genet. 2014 Sep 4;95(3):326-31.",
    "38. Citil C, Konar V, Aydin S, Yilmaz M, Albayrak S, Ozercan IH, Ozkan Y. Brain,liver, and serum salusin-alpha and -beta alterations in Sprague-Dawley rats with or without metabolic syndrome. Med Sci Monit. 2014 Jul 29;20:1326-33.",
    "39. Ciçekçi M, Onur MR, Aydin AM, Gül Y, Ozkan Y, Akpolat N, Kocakoç E. The role of apparent diffusion coefficient values in differentiation between adrenal masses. Clin Imaging. 2014 Mar-Apr;38(2):148-53.",
    "40. Diri H, Bayram F, Simsek Y, Ozkan Y, Akcan A, Karahan I, Ileri I, Aribas S, Koc MS. A Pregnant Woman Who Underwent Laparoscopic Adrenalectomy due to Cushing's Syndrome. Case Rep Endocrinol. 2014;2014:283458.",
    "41. Atmaca M, Korkmaz S, Ustundag B, Ozkan Y. Increased serum prolactin in borderline personality disorder. Int J Psychiatry Med. 2015;49(3):169-75.",
    "42. Ozcelik O, Ozkan Y, Algul S, Colak R. Beneficial effects of training at the anaerobic threshold in addition to pharmacotherapy on weight loss, body composition, and exercise performance in women with obesity. Patient Prefer Adherence. 2015 Jul 13;9:999-1004.",
    "43. Ozturk T, Bozgeyik Z, Ozturk F, Burakgazi G, Akyol M, Coskun S, Ozkan Y, Ogur E. The role of diffusion weighted MR imaging for differentiation between Graves'  disease and Hashimoto thyroiditis. Eur Rev Med Pharmacol Sci. 2015 Aug;19(15):2798-803.",
    "44. Gürel A, Doğantekin A, Özkan Y, Aydın S. Serum apelin levels in patients with thyroid dysfunction. Int J Clin Exp Med. 2015 Sep 15;8(9):16394-8",
    "45. Canpolat S, Ulker N, Yardimci A, Bulmus O, Ozdemir G, Sahin Z, Ercan Z, Serhatlioglu I, Kacar E, Ozcan M, Turk G, Ozkan Y, Atmaca M, Yilmaz B, Kelestimur H. Studies on the reproductive effects of chronic treatment with agomelatine in the rat. Eur J Pharmacol. 2015 Nov 28;770:33-39.",
    "46. Enver Sancakdar, Kadir Ateş, Dilara Kaman, Köksal Deveci, Yusuf Özkan, Necip İlhan. Role of ADDUCIN Gly460Trp, ACE I/D and AGT M235T Gene Polymorphisms in Genetic Susceptibility to Diabetic Nephropathy (Diyabetik Nefropatiye Eğilimde Adducin Gly4460trp, Ace I/D And Agt M235t Gen Polimorfizmlerinin Rolü) Eur j Gen Med 2015;12(2):118-24.",
    "47. Algul S, Ozkan Y, Ozcelik O. Serum nesfatin-1 levels in patients with different glucose tolerance levels. Physiol Res. 2016 Aug 19.",
    "48. Hutchins BI, Kotan LD, Taylor-Burds C, Ozkan Y, Cheng PJ, Gurbuz F, Tiong JD,  Mengen E, Yuksel B, Topaloglu AK, Wray S. CCDC141 Mutation Identified in Anosmic Hypogonadotropic Hypogonadism (Kallmann Syndrome) Alters GnRH Neuronal Migration. Endocrinology. 2016 May;157(5):1956-66."
  ];

  const nationalPublications = [
    "1. Dönder, E., M. Ekşioğlu, R. Çolak, A. Doğukan, Y. Özkan, \"Obez Bireylerde 3 aylık Deksfenfluramine Tedavisinin Etkinliğinin Araştırılması\", Fırat Tıp Dergisi, 1:2, 89-95, (1996).",
    "2. Var, A., N. İlhan, Y. Özkan, N. İlhan, İ. Halifeoğlu, \"Kronik Böbrek Yetmezliği Bulunan Hastalarda Lipit Peroksidasyonu ve Hemodiyalizle Olan Etkileşimleri\", Fırat Tıp Dergisi, 1:5, 295-298, (1998).",
    "3. Şimşek, M., R. Çolak, Y. Özkan, E. Dönder, \"Fırat Üniversitesi Tıp Fakültesi Kadın Doğum Polikliniğine Müracaat Eden 216 Olguda Gestasyonel Diabetes Mellitus Sıklığının Araştırılması\", Endokrinolojide Yönelişler, 7:3, 89-91 (1998).",
    "4. Özkan, Y., E. Dönder, G. Baydaş, \"Deneysel Olarak Oluşturulan Hipertiroidi ve Hipotiroidinin Sıçan Beyin Dokusunda Lipid Peroksidasyonu ve Antioksidan Sistemler Üzerine Etkisi\", Fırat Tıp Dergisi, 4:2, 177-181 (1999).",
    "5. Özkan, Y., E. Dönder, \"Elazığ İl Merkezinde 30 Yaş Üzeri Bireylerde Tip 2 Diabetes Mellitus ve Bozulmuş Glukoz Toleransı Sıklığı\", Fırat Tıp Dergisi, 4:3, 159-164 (1999).",
    "6. Özkan, Y., E. Dönder, \"Tip 2 Diabetes Mellitus'lu Hastalarda Mikroalbuminuri Sıklığı\", Fırat Tıp Dergisi, 4:3, 165-169 (1999).",
    "7. Özkan, Y., E. Dönder, \"Tip 2 Diabetes Mellitus'lu Hastalarda Mikroalbuminuri ve Risk Faktörleri ile İlişkisi\", Fırat Tıp Dergisi, 5:1, 434-441 (2000).",
    "8. Özkan, Y., E. Dönder, \"Tip 2 Diabetes Mellitus'lu Hastalarda Retinopati Sıklığı ve Risk Faktörleri ile İlişkisi\", Fırat Tıp Dergisi, 5:2, 523-531 (2000).",
    "9. Özkan, Y., E. Dönder, \"Tip 2 Diabetes Mellitus'lu Hastalarda Nefropati Sıklığı ve Risk Faktörleri ile İlişkisi\", Fırat Tıp Dergisi, 5:3, 1240-1247 (2000).",
    "10. Özkan, Y., E. Dönder, \"Tip 2 Diabetes Mellitus'lu Hastalarda Nefropati ve Retinopati Arasındaki İlişki\", Fırat Tıp Dergisi, 5:4, 1731-1736 (2000)."
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-2xl font-semibold text-[#394C8C]">Akademik Yayınlar</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Uluslararası Yayınlar */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-[#394C8C] flex items-center">
              <FontAwesomeIcon icon={faGlobe} className="mr-2" />
              Uluslararası Yayınlar
            </h3>
            <div className="space-y-4">
              {internationalPublications.map((publication, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {publication}
                </div>
              ))}
            </div>
          </div>

          {/* Ulusal Yayınlar */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-[#394C8C] flex items-center">
              <FontAwesomeIcon icon={faFlag} className="mr-2" />
              Ulusal Yayınlar
            </h3>
            <div className="space-y-4">
              {nationalPublications.map((publication, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {publication}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicationsModal;
