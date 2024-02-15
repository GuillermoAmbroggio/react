import { Checkbox } from 'antd';
import React from 'react';
import { statusMatch } from '../../../../../../../types/match.types';
import { PredictionAttributes } from '../../../../../../../types/prediction.types';
import formatDateTime from '../../../../../../../utils/hooks/formatDate';
import { Column, Flex } from '../../../../../../../utils/layout';
import styles from './fixtureItem.module.css';

interface FixtureItem {
  prediction: PredictionAttributes;
  handleFixtureItemClick: (
    matchId: number,
    pred: 'local' | 'visitor' | 'tie',
  ) => void;
  isFixtureValidDate?: boolean;
}

const widthImage = '30';

const FixtureItem: React.FC<FixtureItem> = ({
  prediction,
  handleFixtureItemClick,
  isFixtureValidDate,
}) => {
  const { match, predictionLocalTeam, predictionVisitingTeam } = prediction;
  const localTeam = match?.localTeam;
  const visitingTeam = match?.visitingTeam;
  const { date, time } = match?.startDate
    ? formatDateTime(new Date(match.startDate))
    : formatDateTime(undefined);

  if (!localTeam || !visitingTeam) return null;

  if (!match) return null;

  const isLocal = predictionLocalTeam === 1;
  const isVisitor = predictionVisitingTeam === 1;
  const isTie = predictionLocalTeam === 0 && predictionVisitingTeam === 0;

  const resultLocalTeam = match.resultLocalTeam;
  const resultVisitingTeam = match.resultVisitingTeam;
  const isResultsMatch = resultLocalTeam != null && resultVisitingTeam != null;

  return (
    <Flex
      className={`${styles.container} ${
        isResultsMatch || !isFixtureValidDate ? styles.finishedMatch : ''
      }`}
    >
      <div className={styles.containerFixtureItem}>
        <div
          className={`${styles.containerTeam} ${
            isLocal && styles.containerTeamSelected
          } `}
          onClick={() => handleFixtureItemClick(match.id, 'local')}
        >
          <div>
            <img
              src={localTeam?.image}
              alt={`escudo-${localTeam.name}`}
              width={widthImage}
              height='auto'
            />
          </div>
          <Column className={styles.teamNameLeft}>
            <p className={styles.teamText}>{localTeam.name}</p>
            {isResultsMatch || !isFixtureValidDate ? (
              <p>({resultLocalTeam != null ? resultLocalTeam : '-'})</p>
            ) : (
              <Checkbox checked={isLocal} />
            )}
          </Column>
        </div>
        <Column
          alignItems='center'
          className={`${styles.containerVs} ${
            isTie && styles.containerTeamSelected
          }`}
          onClick={() => handleFixtureItemClick(match.id, 'tie')}
        >
          <p className={styles.vsText}>Vs</p>
          {isResultsMatch || !isFixtureValidDate ? null : (
            <Checkbox checked={isTie} />
          )}
        </Column>
        <div
          className={`${styles.containerTeam} ${styles.containerTeamRigth} ${
            isVisitor && styles.containerTeamSelected
          } `}
          onClick={() => handleFixtureItemClick(match.id, 'visitor')}
        >
          <Column className={styles.teamNameRight}>
            <p className={`${styles.teamText} ${styles.teamTextRigth}`}>
              {visitingTeam.name}
            </p>
            {isResultsMatch || !isFixtureValidDate ? (
              <p>({resultVisitingTeam != null ? resultVisitingTeam : '-'})</p>
            ) : (
              <Checkbox
                checked={isVisitor}
                className={styles.checkboxVisitor}
              />
            )}
          </Column>
          <img
            src={visitingTeam.image}
            alt={`escudo-${visitingTeam.name}`}
            width={widthImage}
            height='auto'
          />
        </div>
      </div>
      <Column className={styles.containerStatus}>
        {match.status === 'toStart' ? (
          <>
            <p>{date}</p>
            <p>{time}</p>
          </>
        ) : (
          <>
            <p>{statusMatch[match.status]}</p>
            <p>{date}</p>
          </>
        )}
      </Column>
    </Flex>
  );
};

export default FixtureItem;
