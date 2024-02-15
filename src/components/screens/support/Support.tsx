import React from 'react';
import useWriting from '../../../copywriting/useWriting';
import { Column, Flex } from '../../../utils/layout';
import BannerSection from '../../../utils/layout/components/bannerSection/BannerSection';
import SupportForm from './components/supportForm/SupportForm';
import styles from './support.module.css';

const Support: React.FC = () => {
  const writing = useWriting();

  return (
    <Column style={{ flex: 1 }}>
      <BannerSection nameSection={writing.support.title} />
      <div className={styles.container}>
        <div className={styles.card}>
          <p>
            ¿Tienes alguna pregunta, enfrentas algún problema o simplemente
            quieres compartir tus sugerencias? Estamos aquí para ayudarte.
          </p>
          <p>
            Puedes ponerte en contacto con nosotros a través del siguiente
            correo electrónico:
          </p>
          <Flex alignItems={'center'} className={styles.email}>
            <i className='fas fa-envelope'></i>
            <p>soporte@fixtuwin.com.ar</p>
          </Flex>
        </div>
        <Column className={styles.card} gap={24}>
          <p>
            Además, si prefieres, puedes completar el formulario que aparece a
            continuación. Nos pondremos en contacto contigo en las próximas
            horas para brindarte la asistencia que necesitas.
          </p>
          <SupportForm />
        </Column>
      </div>
    </Column>
  );
};

export default Support;
