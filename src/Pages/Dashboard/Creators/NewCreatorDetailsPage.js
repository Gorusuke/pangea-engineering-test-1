import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { AppBar } from '@mui/material';
import { API_ENDPOINTS } from '../../../API/endpoints';
import { findMaxValue, getInfoFromCreator } from '../../../Utils';
import blitzLogo from "../../../Components/globalAssets/platty.png";
import routes from '../../../Config/routes';
import './styles.css'

const NewCreatorDetailsPage = () => {
  const { creatorId } = useParams();
  const [creatorDetails, setCreatorDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCreatorDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://blitz-backend-nine.vercel.app/api${API_ENDPOINTS.CREATORS_SPEC}${creatorId}`);
        const creator = await response.json()
        setCreatorDetails(creator);
      } catch (error) {
        console.error("Failed to fetch creator details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (creatorId) fetchCreatorDetails();

  }, [creatorId]);

  const { creatorInfo, followersData, promotionData } = getInfoFromCreator(creatorDetails)

  if (loading) return 'Loading creator details'
  if (!Object.values(creatorDetails).length) return 'No creator details found'

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#000" }}>
        <Link to={routes.home}>
          <img
            src={blitzLogo}
            alt="logo"
            style={{ width: "120px", height: "50px" }}
          />
        </Link>
      </AppBar>
      <main className='main'>
        <section className='profile'>
          <div>
            <picture >
              <img
                className='image'
                src={creatorDetails.pfphref}
                alt={creatorDetails.creator}
              />
            </picture>
            <h2 className='title'>@{creatorDetails.creator}</h2>
          </div>
          <div className='infoContainer'>
            {creatorInfo.map(creator => {
              const renderValue = creator.link ? <a href={creator.link}>{creator.value}</a> : <span>{creator.value}</span>
              return <p key={creator.name} className='info'>{creator.name}: <i>{renderValue}</i></p>
            })}
          </div>
        </section>
        <section className='infoCreator'>
          <div className='followerDistribution'>
            <h3 className='title'>Followers Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={followersData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {followersData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={["#0088FE", "#00C49F", "#FFBB28"][index]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className='promotionRatesContainer'>
            <h3 className='title'>Promotion Rates ($)</h3>
            <ul className='promotionRates'>
              {promotionData.map((data) => {
                const replaceValue = data.value.replace(/[^0-9.-]+/g, "")
                const getValue = Number(replaceValue)
                return (
                  <div key={data.name} className='promotionRatesData'>
                    <label htmlFor='file'>{data.name}: </label>
                    <progress className='bar' id='file' max={findMaxValue(promotionData)} value={getValue} />
                    <span> {data.value}</span>
                  </div>
                )
              }
              )}
            </ul>
          </div>
          <div className='moreInfo'>
            {creatorDetails.geolocation_gender_ethnicity && <p><b> Geolocation & Ethnicity:</b> {creatorDetails.geolocation_gender_ethnicity}</p>}
            {creatorDetails.notes_content_style && <p><b>Content Style: </b> {creatorDetails.notes_content_style}</p>}
          </div>
        </section>
      </main>
    </>
  )
}

export default NewCreatorDetailsPage