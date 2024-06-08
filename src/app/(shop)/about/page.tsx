import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toMerchandises } from "@/lib/routes";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="space-y-4 pt-6">
      <h1 className="text-3xl font-bold  text-center">О компании</h1>
      <p className="text-justify text-gray-500">
        Мы, интернет-магазин шоурум, являемся одним из ведущих продавцов
        спортивных товаров в интернете. Наша команда состоит из профессионалов,
        которые любят спорт и заботятся о том, чтобы каждый клиент получил
        лучший опыт покупок. Мы предлагаем широкий ассортимент спортивных
        товаров от лучших мировых брендов. У нас вы найдете все необходимое для
        занятий любым видом спорта: от футбола до йоги. Наш каталог включает в
        себя одежду, обувь, аксессуары и оборудование для тренировок. Мы
        гарантируем высокое качество всех наших товаров и быструю доставку по
        всей территории России. Кроме того, мы предоставляем бесплатную
        консультацию по выбору товара и помощь в оформлении заказа. Мы ценим
        каждого клиента и стараемся сделать все возможное, чтобы удовлетворить
        его потребности. Если у вас есть какие-либо вопросы или нужна помощь при
        выборе товара, пожалуйста, свяжитесь с нами. Благодарим вас за выбор
        нашего магазина!
      </p>
      <Separator className="my-4" />
      <div className="flex h-min">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Наша миссия</h2>
          <p className="text-gray-500 pr-6">
            Наша миссия заключается в предоставлении качественных спортивных
            товаров для людей, которые стремятся к здоровому образу жизни и
            хотят достигать новых результатов в своих тренировках. Мы верим, что
            спорт помогает людям стать сильнее, быстрее и выносливее, а также
            улучшает настроение и общее самочувствие. Поэтому наша компания
            стремится предложить широкий ассортимент продукции высокого качества
            по доступным ценам, чтобы каждый мог найти то, что ему нужно для
            достижения своих целей. Мы также стремимся поддерживать наших
            клиентов на протяжении всего процесса покупки - от выбора товара до
            его получения - чтобы они получили максимальную пользу от своей
            покупки и остались довольными своим опытом работы с нами.
          </p>
          <Separator className="my-4" />
          <h2 className="text-2xl font-bold">Контактная информация</h2>
          <div className="space-y-2">
            <div>
              <div className="flex items-center">
                <MapPin size={20} className="mr-2" />
                <span className="font-semibold">Наш офис</span>
              </div>
              <p>г. Москва, улица Строителей, дом 18, корпус 4</p>
            </div>
            <div>
              <div className="flex items-center">
                <Phone size={20} className="mr-2" />
                <span className="font-semibold">Телефон</span>
              </div>
              <p>+7(999)-888-55-66</p>
            </div>
            <div>
              <div className="flex items-center">
                <Mail size={20} className="mr-2" />
                <span className="font-semibold">Електронная почта</span>
              </div>
              <p>athlete@mail.ru</p>
            </div>
            <div>
              <div className="flex gap-x-2">
                <Link href={"https://www.instagram.com"} target="_blank">
                  <Instagram />
                </Link>
                <Link href={"https://www.facebook.com"} target="_blank">
                  <Facebook />
                </Link>
                <Link href={"https://www.youtube.com"} target="_blank">
                  <Youtube />
                </Link>
                <Link href={"https://www.youtube.com"} target="_blank">
                  <Twitter />
                </Link>
                <Link
                  href={"https://www.vk.ru"}
                  className="font-bold"
                  target="_blank"
                >
                  VK
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Image
          className="rounded-xl"
          src="/about/mission.jpg"
          width={500}
          height={500}
          alt=""
        />
      </div>
    </div>
  );
}
