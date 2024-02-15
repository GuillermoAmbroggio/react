import { Checkbox } from 'antd';
import React from 'react';
import { Column, Flex } from '../../../../utils/layout';
import styles from './matchItem.module.css';
import formatDateTime from '../../../../utils/hooks/formatDate';
import { statusMatch } from '../../../../types/match.types';
import { PredictionAttributes } from '../../../../types/prediction.types';
import { useGetMatch } from '../../../serverStore/queries';
interface ImatchItemProps {
  prediction: PredictionAttributes;
  displayPoints?: boolean;
}

const widthImage = '30';

const MatchItem: React.FC<ImatchItemProps> = ({
  prediction,
  displayPoints,
}) => {
  const { match, predictionLocalTeam, predictionVisitingTeam, matchId } =
    prediction;
  const { data: matchData } =
    matchId && !match ? useGetMatch(matchId) : { data: null };
  const matchValue = match || matchData;
  const localTeam = matchValue?.localTeam;
  const visitingTeam = matchValue?.visitingTeam;
  const { date, time } = formatDateTime(new Date(matchValue?.startDate || ''));

  if (!localTeam || !visitingTeam) return null;

  if (!matchValue) return null;
  const isPredictionLocal =
    predictionLocalTeam != null &&
    predictionVisitingTeam != null &&
    predictionLocalTeam > predictionVisitingTeam;
  const isPredictionVisitor =
    predictionLocalTeam != null &&
    predictionVisitingTeam != null &&
    predictionVisitingTeam > predictionLocalTeam;
  const isPredictionTie =
    predictionLocalTeam != null &&
    predictionVisitingTeam != null &&
    predictionLocalTeam === predictionVisitingTeam;
  const resultLocalTeam = matchValue.resultLocalTeam;
  const resultVisitingTeam = matchValue.resultVisitingTeam;
  const isResultsMatch = resultLocalTeam != null && resultVisitingTeam != null;

  const isLocalWin = isResultsMatch && resultLocalTeam > resultVisitingTeam;
  const isVisitorWin = isResultsMatch && resultVisitingTeam > resultLocalTeam;
  const isTieResult = isResultsMatch && resultLocalTeam === resultVisitingTeam;

  return (
    <Flex className={styles.containerMatchItem}>
      <div className={styles.containerFixtureItem}>
        <div
          className={`${styles.containerTeam} ${
            isPredictionLocal && styles.containerTeamSelected
          }  ${
            isPredictionLocal &&
            (isLocalWin || !displayPoints) &&
            styles.containerTeamSuccessful
          } `}
        >
          <img
            src={localTeam?.image}
            alt={`escudo-${localTeam.name}`}
            width={widthImage}
            height='auto'
          />
          <Column className={styles.teamNameLeft}>
            <p className={styles.teamText}>{localTeam.name}</p>
            {isResultsMatch ? (
              <p>({resultLocalTeam})</p>
            ) : (
              <Checkbox checked={isPredictionLocal} />
            )}
          </Column>
        </div>
        <Column
          alignItems='center'
          className={`${styles.containerVs} ${
            isPredictionTie && styles.containerTeamSelected
          }  ${
            isPredictionTie &&
            (isTieResult || !displayPoints) &&
            styles.containerTeamSuccessful
          } `}
        >
          <p className={styles.vsText}>Vs</p>
          {isResultsMatch ? null : <Checkbox checked={isPredictionTie} />}
        </Column>
        <div
          className={`${styles.containerTeam} ${styles.containerTeamRigth} ${
            isPredictionVisitor && styles.containerTeamSelected
          }  ${
            isPredictionVisitor &&
            (isVisitorWin || !displayPoints) &&
            styles.containerTeamSuccessful
          } `}
        >
          <Column className={styles.teamNameRight}>
            <p className={`${styles.teamText} ${styles.teamTextRigth}`}>
              {visitingTeam.name}
            </p>
            {isResultsMatch ? (
              <p>({resultVisitingTeam})</p>
            ) : (
              <Checkbox
                checked={isPredictionVisitor}
                className={styles.checkRigth}
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
        {displayPoints ? (
          <Column className={styles.containerPoints}>
            {isResultsMatch ? prediction.resultPoints : '-'}
          </Column>
        ) : null}
      </div>
      <Column className={styles.containerStatus}>
        {matchValue.status === 'toStart' ? (
          <>
            <p className={styles.statusText}>{date}</p>
            <p className={styles.statusText}>{time}</p>
          </>
        ) : (
          <>
            <p className={styles.statusText}>
              {statusMatch[matchValue.status]}
            </p>
            <p className={styles.statusText}>{date}</p>
          </>
        )}
      </Column>
    </Flex>
  );
};

export default MatchItem;
