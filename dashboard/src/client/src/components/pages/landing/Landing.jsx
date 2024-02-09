import { Skeleton } from '@material-ui/lab'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
/* Charts */
import Chart from 'react-apexcharts'
import { AiFillTags } from 'react-icons/ai'
import { BsArrowRightShort } from 'react-icons/bs'
/* React icons */
import { FaDollarSign, FaListUl } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { animated, config, useSpring } from 'react-spring'
import ReactTimeAgo from 'react-time-ago/commonjs/ReactTimeAgo'
import styled from 'styled-components'
import HelmetHandler from '../../../utils/HelmetHandler'
/* NavState */
import { Context } from '../../../utils/NavState'
import { notify_error, notify_success } from '../../../utils/Notifications'
import Popup from '../../../utils/Popup'
import SmallBtn from '../../global/buttons/SmallBtn'
/* Page elements */
import Footer from '../../global/Footer'
import NavbarHeader from '../../global/NavbarHeader'
import VerticalMenu from '../../global/VerticalMenu'
/* Global common styles */
import {
    GlobalBtn,
    GlobalInput,
    MainWrapper,
    PageTitleContainer,
    PageTitleH4,
    PageTitleNav,
    PageTitleSpan,
} from '../../styles/GlobalStyles'
/* Chart data */
import { options, options2, options3 } from './ChartData'

function Landing() {
    const [navState] = useContext(Context)
    const auth = useSelector((state) => state.auth)
    const { user } = auth
    const token = useSelector((state) => state.token)
    const [callback, setCallback] = useState(false)
    const [chartBtn, setChartBtn] = useState('7days')
    const [data, setData] = useState()
    const [chartData, setChartData] = useState()

    const [loading, setLoading] = useState(true)
    const skeletonamount = 5

    // Progress settings
    const [progressSettings, setProgressSettings] = useState(false)
    const [progressGoal, setProgressGoal] = useState(1)

    ///////////////////////////////////////
    //*
    //*   Animations
    //*
    ///////////////////////////////////////

    const fadeElement = useSpring({
        config: { ...config.stiff },
        from: { opacity: 0 },
        to: {
            opacity: loading ? 0 : 1,
        },
    })
    const fadeLoader = useSpring({
        config: { ...config.stiff },
        from: { opacity: 0 },
        to: {
            opacity: loading ? 1 : 0,
        },
    })

    ///////////////////////////////////////
    //*
    //*   Get dashboard data
    //*
    ///////////////////////////////////////

    useEffect(() => {
        let unmounted = false
        if (!unmounted && token) {
            const getData = async () => {
                let res = await axios.get(`/api/users/getdashboarddata`, {
                    headers: { Authorization: token },
                })
                if (!unmounted) {
                    setData(res.data)
                    setProgressGoal(res.data.license_goal_monthly)
                    setTimeout(
                        () => (!unmounted ? setLoading(false) : null),
                        250
                    )
                }
            }
            getData()
        }
        return () => {
            unmounted = true
        }
    }, [user])

    useEffect(() => {
        let unmounted = false
        if (!unmounted) {
            const getData = async () => {
                let res = await axios.get(
                    `/api/users/updatedchartdata?range=${chartBtn}`,
                    {
                        headers: { Authorization: token },
                    }
                )
                if (!unmounted) {
                    setChartData(res.data)
                }
            }
            getData()
        }
        return () => {
            unmounted = true
        }
    }, [callback])

    ///////////////////////////////////////
    //*
    //*   Button handler
    //*
    ///////////////////////////////////////

    const handleBtn = (e) => {
        // Decrease (dec), Increase (inc), Infinity (inf)
        e.preventDefault()
        const { value } = e.target
        if (value === 'dec') {
            if (parseInt(progressGoal) > 1) {
                let new_value = parseInt(progressGoal) - 1
                return setProgressGoal(new_value)
            }
        }
        if (value === 'inc') {
            if (parseInt(progressGoal) >= 0) {
                let new_value = parseInt(progressGoal) + 1
                return setProgressGoal(new_value)
            }
        }
    }

    ///////////////////////////////////////
    //*
    //*   Change input
    //*
    ///////////////////////////////////////

    const handleChangeInput = (e) => {
        const { value } = e.target
        setProgressGoal(value)
    }

    ///////////////////////////////////////
    //*
    //*    Handle submit
    //*
    ///////////////////////////////////////

    const handleSubmit = async (e) => {
        try {
            const res = await axios.post(
                '/api/users/updateprogressgoal',
                { progressGoal },
                {
                    headers: { Authorization: token },
                }
            )
            notify_success(res.data.msg)
            setProgressSettings(false)
            setCallback(!callback)
        } catch (err) {
            err.response.data.msg && notify_error(err.response.data.msg)
        }
    }

    ///////////////////////////////////////
    //*
    //*   Latest request origin
    //*
    ///////////////////////////////////////

    const renderLatestRequest = () => {
        if (!data) {
            return null
        }
        if (data?.latest_requests_list?.length === 0) {
            return (
                <p style={{ color: '#a6b0cf', padding: '12px' }}>
                    No results...
                </p>
            )
        }
        return data.latest_requests_list.map((item) => (
            <LargeCardElementV4 key={item.date}>
                <LargeCardElementTextV4>{item.client}</LargeCardElementTextV4>
                <LargeCardElementTextV4>{item.ip}</LargeCardElementTextV4>
                <LargeCardElementTextV4>
                    <ReactTimeAgo date={Date.parse(item.date)} locale="en-US" />
                </LargeCardElementTextV4>
            </LargeCardElementV4>
        ))
    }

    ///////////////////////////////////////
    //*
    //*   Latest licenses
    //*
    ///////////////////////////////////////

    const renderLatestLicenses = () => {
        if (!data) {
            return null
        }
        if (data?.latest_licenses?.length === 0) {
            return (
                <p style={{ color: '#a6b0cf', padding: '12px' }}>
                    No results...
                </p>
            )
        }
        return data.latest_licenses.map((item) => (
            <LargeCardElementV3 key={item._id}>
                <LargeCardElementTextV3>
                    <LargeCardElementSpan>
                        #{item.license_id}
                    </LargeCardElementSpan>
                </LargeCardElementTextV3>
                <LargeCardElementTextV3>
                    {item.clientname}
                </LargeCardElementTextV3>
                <LargeCardElementTextV3>
                    {item.product_name}
                </LargeCardElementTextV3>
                <LargeCardElementTextV3>
                    {item.created_by}
                </LargeCardElementTextV3>
                <LargeCardElementTextV3>
                    <ReactTimeAgo
                        date={Date.parse(item.createdAt)}
                        locale="en-US"
                    />
                </LargeCardElementTextV3>
            </LargeCardElementV3>
        ))
    }

    ///////////////////////////////////////
    //*
    //*   Latest activity
    //*
    ///////////////////////////////////////

    const renderLatestActivity = () => {
        if (!data) {
            return null
        }
        if (data?.latest_logs?.length === 0) {
            return (
                <p style={{ color: '#a6b0cf', padding: '12px' }}>
                    No results...
                </p>
            )
        }
        return data.latest_logs.map((item) => (
            <LargeCardElementV4 key={item._id}>
                <LargeCardElementTextV4>{item.user}</LargeCardElementTextV4>
                <LargeCardElementTextV4>{item.activity}</LargeCardElementTextV4>
                <LargeCardElementTextV4>
                    <ReactTimeAgo
                        date={Date.parse(item.createdAt)}
                        locale="en-US"
                    />
                </LargeCardElementTextV4>
            </LargeCardElementV4>
        ))
    }

    ///////////////////////////////////////
    //*
    //*   Handle change
    //*
    ///////////////////////////////////////

    const handleChange = (e) => {
        e.preventDefault()
        const { value } = e.target

        setChartBtn(value)
        setCallback(!callback)
    }

    return (
        <>
            <HelmetHandler title="Dashboard - GateWay" />
            <NavbarHeader NavStatus={navState} />
            <VerticalMenu NavStatus={navState} />

            <Popup trigger={progressSettings} setTrigger={setProgressSettings}>
                <MediumCardH4>Change progress goals</MediumCardH4>
                <MediumCardTextV2>
                    Here you can change your monthly goal for sales. How many
                    licenses you want to sell per month?
                </MediumCardTextV2>
                <CreateLicenseAdvancedGroup>
                    <SmallBtn text="-" value="dec" onClick={handleBtn} />
                    <GlobalInput
                        value={progressGoal}
                        onChange={handleChangeInput}
                        type="number"
                        min="1"
                        id="cl_ip_cap"
                    />
                    <SmallBtn text="+" value="inc" onClick={handleBtn} />
                </CreateLicenseAdvancedGroup>
                <GlobalBtn
                    onClick={handleSubmit}
                    style={{ marginTop: '10px', marginBottom: '10px' }}
                >
                    Submit
                </GlobalBtn>
            </Popup>

            <MainWrapper
                style={
                    navState ? { marginLeft: '70px' } : { marginLeft: '250px' }
                }
            >
                <PageTitleContainer>
                    <PageTitleH4>Dashboard</PageTitleH4>
                    <PageTitleNav>
                        Home <PageTitleSpan>/</PageTitleSpan> Dashboard
                    </PageTitleNav>
                </PageTitleContainer>
                <LandingWrapper>
                    <LandingCol className="col1">
                        <MediumCardContainer>
                            <MediumCardElementContainer>
                                <MediumCardElement>
                                    <MediumCardH5>Welcome back!</MediumCardH5>
                                    <MediumCardText>
                                        Having a nice day?
                                    </MediumCardText>
                                </MediumCardElement>
                                <MediumCardElement>
                                    <MediumCardHeaderImg src="https://cdn.discordapp.com/attachments/729088611986702508/825709290966220832/undraw_Online_learning_re_qw08.svg" />
                                </MediumCardElement>
                            </MediumCardElementContainer>
                            <MediumCardElementContainer>
                                <MediumCardElement>
                                    {loading ? (
                                        <animated.div style={fadeLoader}>
                                            <Skeleton
                                                animation="wave"
                                                variant="circle"
                                                width={'72px'}
                                                height={'72px'}
                                                style={{ marginTop: '-3rem' }}
                                            />
                                        </animated.div>
                                    ) : (
                                        <animated.div style={fadeElement}>
                                            <MediumCardImg
                                                src={
                                                    user.image
                                                        ? `/images/${user.image}`
                                                        : `/images/default.png`
                                                }
                                            />
                                        </animated.div>
                                    )}

                                    <MediumCardH5V2>{user.name}</MediumCardH5V2>
                                    <MediumCardTextV2>
                                        {user.role === 0
                                            ? 'Administrator'
                                            : 'Moderator'}
                                    </MediumCardTextV2>
                                </MediumCardElement>
                                <MediumCardElement>
                                    <MediumCardColumn>
                                        <MediumCardH5V2>
                                            {user.licenses_added}
                                        </MediumCardH5V2>
                                        <MediumCardTextV2>
                                            Licenses added
                                        </MediumCardTextV2>

                                        <CardsLinkBtn to="/settings">
                                            View Settings
                                            <BsArrowRightShort />
                                        </CardsLinkBtn>
                                    </MediumCardColumn>
                                </MediumCardElement>
                                <MediumCardElement>
                                    <MediumCardColumn>
                                        <MediumCardH5V2>
                                            €
                                            {user.revenue
                                                ? user.revenue.toFixed(2)
                                                : user.revenue}
                                        </MediumCardH5V2>
                                        <MediumCardTextV2>
                                            Revenue
                                        </MediumCardTextV2>
                                    </MediumCardColumn>
                                </MediumCardElement>
                            </MediumCardElementContainer>
                        </MediumCardContainer>
                    </LandingCol>
                    <LandingCol className="col2">
                        <SmallCardContainer>
                            <SmallCardElement>
                                <SmallCardTitle>Total licenses</SmallCardTitle>
                                <SmallCardH4>
                                    {loading ? (
                                        <animated.span style={fadeLoader}>
                                            <Skeleton
                                                animation="wave"
                                                width={'100%'}
                                                height={'30px'}
                                            />
                                        </animated.span>
                                    ) : (
                                        <animated.span style={fadeElement}>
                                            {data?.total_licenses || '0'}
                                        </animated.span>
                                    )}
                                </SmallCardH4>
                            </SmallCardElement>
                            <SmallCardElement>
                                <SmallCardSpan>
                                    <FaListUl />
                                </SmallCardSpan>
                            </SmallCardElement>
                        </SmallCardContainer>
                    </LandingCol>
                    <LandingCol className="col3">
                        <SmallCardContainer>
                            <SmallCardElement>
                                <SmallCardTitle>Weekly earnings</SmallCardTitle>
                                <SmallCardH4>
                                    {loading ? (
                                        <animated.span style={fadeLoader}>
                                            <Skeleton
                                                animation="wave"
                                                width={'100%'}
                                                height={'30px'}
                                            />
                                        </animated.span>
                                    ) : (
                                        <animated.span style={fadeElement}>
                                            {`€${data?.weekly_earnings}` || '0'}
                                        </animated.span>
                                    )}
                                </SmallCardH4>
                            </SmallCardElement>
                            <SmallCardElement>
                                <SmallCardSpan>
                                    <FaDollarSign />
                                </SmallCardSpan>
                            </SmallCardElement>
                        </SmallCardContainer>
                    </LandingCol>
                    <LandingCol className="col4">
                        <SmallCardContainer>
                            <SmallCardElement>
                                <SmallCardTitle>
                                    Monthly earnings
                                </SmallCardTitle>
                                <SmallCardH4>
                                    {loading ? (
                                        <animated.span style={fadeLoader}>
                                            {' '}
                                            <Skeleton
                                                animation="wave"
                                                width={'100%'}
                                                height={'30px'}
                                            />
                                        </animated.span>
                                    ) : (
                                        <animated.span style={fadeElement}>
                                            {`€${data?.monthly_earnings}` ||
                                                '0'}
                                        </animated.span>
                                    )}
                                </SmallCardH4>
                            </SmallCardElement>
                            <SmallCardElement>
                                <SmallCardSpan>
                                    <FaDollarSign />
                                </SmallCardSpan>
                            </SmallCardElement>
                        </SmallCardContainer>
                    </LandingCol>
                    <LandingCol className="col5">
                        <MediumCardContainer>
                            <MediumCardColumnContainer>
                                <MediumCardH4>Monthly licenses</MediumCardH4>
                                <MediumCardElementContainerV2>
                                    <MediumCardColumn>
                                        <MediumCardTextV2>
                                            This month
                                        </MediumCardTextV2>
                                        <MediumCardH3>
                                            {loading ? (
                                                <animated.span
                                                    style={fadeLoader}
                                                >
                                                    <Skeleton
                                                        animation="wave"
                                                        width={'100%'}
                                                        height={'25px'}
                                                    />
                                                </animated.span>
                                            ) : (
                                                <animated.span
                                                    style={fadeElement}
                                                >
                                                    {`${data?.monthly_licenses}` ||
                                                        '0'}
                                                </animated.span>
                                            )}
                                        </MediumCardH3>
                                        <MediumCardTextV2>
                                            <span
                                                style={
                                                    data?.last_month > 0
                                                        ? {
                                                              color: '#34c38f',
                                                          }
                                                        : {
                                                              color: '#f46a6a',
                                                          }
                                                }
                                            >
                                                {loading ? (
                                                    <animated.span
                                                        style={fadeLoader}
                                                    >
                                                        <Skeleton
                                                            animation="wave"
                                                            width={'100%'}
                                                            height={'25px'}
                                                        />
                                                    </animated.span>
                                                ) : (
                                                    <animated.span
                                                        style={fadeElement}
                                                    >
                                                        {data?.last_month?.toFixed(
                                                            0
                                                        ) || '0'}
                                                        %
                                                    </animated.span>
                                                )}
                                            </span>{' '}
                                            From previous month
                                        </MediumCardTextV2>
                                        <CardsLinkButton
                                            disabled={
                                                user.role === 0 ? false : true
                                            }
                                            onClick={() =>
                                                setProgressSettings(true)
                                            }
                                        >
                                            Update goals
                                            <BsArrowRightShort />
                                        </CardsLinkButton>
                                    </MediumCardColumn>
                                    <MediumCardColumn>
                                        <Chart
                                            options={options2}
                                            series={[
                                                loading
                                                    ? 0
                                                    : (
                                                          (data?.monthly_licenses /
                                                              progressGoal) *
                                                          100
                                                      )?.toFixed(2) || 0,
                                            ]}
                                            type="radialBar"
                                            height="140%"
                                        ></Chart>
                                    </MediumCardColumn>
                                </MediumCardElementContainerV2>
                                <MediumCardTextV2>
                                    Progress chart goal can be modified from
                                    above.
                                </MediumCardTextV2>
                            </MediumCardColumnContainer>
                        </MediumCardContainer>
                    </LandingCol>
                    <LandingCol className="col6">
                        <LargeCardTitleContainer>
                            <MediumCardH4>Latest requests</MediumCardH4>
                            <LargeCardButtons>
                                <LargeCardButton
                                    onClick={handleChange}
                                    value="today"
                                    style={
                                        chartBtn === 'today'
                                            ? {
                                                  backgroundColor: '#556EE6',
                                                  padding: '5px',
                                                  borderRadius: '.25rem',
                                              }
                                            : { padding: '5px' }
                                    }
                                >
                                    Today
                                </LargeCardButton>
                                <LargeCardButton
                                    onClick={handleChange}
                                    value="7days"
                                    style={
                                        chartBtn === '7days'
                                            ? {
                                                  backgroundColor: '#556EE6',
                                                  padding: '5px',
                                                  borderRadius: '.25rem',
                                              }
                                            : { padding: '5px' }
                                    }
                                >
                                    7 days
                                </LargeCardButton>
                                <LargeCardButton
                                    style={
                                        chartBtn === '30days'
                                            ? {
                                                  backgroundColor: '#556EE6',
                                                  padding: '5px',
                                                  borderRadius: '.25rem',
                                              }
                                            : { padding: '5px' }
                                    }
                                    value="30days"
                                    onClick={handleChange}
                                >
                                    30 days
                                </LargeCardButton>
                            </LargeCardButtons>
                        </LargeCardTitleContainer>
                        <ChartContainer>
                            {chartData ? (
                                <Chart
                                    options={{
                                        ...options,
                                        xaxis: {
                                            type: 'datetime',
                                            categories: chartData['days'],
                                        },
                                        tooltip: {
                                            x: {
                                                format: 'dd/MM/yy',
                                            },
                                        },
                                    }}
                                    series={[
                                        {
                                            name: 'Successful',
                                            data: chartData['successful'],
                                        },
                                        {
                                            name: 'Failed',
                                            data: chartData['rejected'],
                                        },
                                    ]}
                                    type="area"
                                    width="100%"
                                    height="360px"
                                ></Chart>
                            ) : null}
                        </ChartContainer>
                    </LandingCol>
                    <LandingCol className="col7">
                        <LargeCardTitleContainer>
                            <MediumCardH4>Latest activity</MediumCardH4>
                        </LargeCardTitleContainer>
                        <LargeCardListContainer
                            style={{
                                overflowX: 'auto',
                                minHeight: '80%',
                            }}
                        >
                            <LargeCardElementV4
                                style={{
                                    fontweight: '600',
                                    backgroundColor: '#32394e',
                                }}
                            >
                                <LargeCardElementTextV4>
                                    User:
                                </LargeCardElementTextV4>
                                <LargeCardElementTextV4>
                                    Activity:
                                </LargeCardElementTextV4>
                                <LargeCardElementTextV4>
                                    Date:
                                </LargeCardElementTextV4>
                            </LargeCardElementV4>
                            {loading ? (
                                <>
                                    <animated.div style={fadeLoader}>
                                        {[...Array(skeletonamount)].map(
                                            (elementInArray, index) => (
                                                <LargeCardElementV4 key={index}>
                                                    <LargeCardElementTextV4>
                                                        <Skeleton
                                                            animation="wave"
                                                            width={'90%'}
                                                            height={'20px'}
                                                        />
                                                    </LargeCardElementTextV4>
                                                    <LargeCardElementTextV4>
                                                        <Skeleton
                                                            animation="wave"
                                                            width={'90%'}
                                                            height={'20px'}
                                                        />
                                                    </LargeCardElementTextV4>
                                                    <LargeCardElementTextV4>
                                                        <Skeleton
                                                            animation="wave"
                                                            width={'90%'}
                                                            height={'20px'}
                                                        />
                                                    </LargeCardElementTextV4>
                                                </LargeCardElementV4>
                                            )
                                        )}
                                    </animated.div>
                                </>
                            ) : (
                                <animated.div style={fadeElement}>
                                    {renderLatestActivity()}
                                </animated.div>
                            )}
                        </LargeCardListContainer>
                    </LandingCol>
                    <LandingCol className="col8">
                        <LargeCardTitleContainer>
                            <MediumCardH4>Latest requests today</MediumCardH4>
                        </LargeCardTitleContainer>
                        <LargeCardListContainer
                            style={{
                                overflowX: 'auto',
                                minHeight: '80%',
                            }}
                        >
                            <LargeCardElementV4
                                style={{
                                    fontweight: '600',
                                    backgroundColor: '#32394e',
                                }}
                            >
                                <LargeCardElementTextV4>
                                    Client:
                                </LargeCardElementTextV4>
                                <LargeCardElementTextV4>
                                    IP:
                                </LargeCardElementTextV4>
                                <LargeCardElementTextV4>
                                    Date:
                                </LargeCardElementTextV4>
                            </LargeCardElementV4>
                            {loading ? (
                                <>
                                    <animated.div style={fadeLoader}>
                                        {[...Array(skeletonamount)].map(
                                            (elementInArray, index) => (
                                                <LargeCardElementV4 key={index}>
                                                    <LargeCardElementTextV4>
                                                        <Skeleton
                                                            animation="wave"
                                                            width={'90%'}
                                                            height={'20px'}
                                                        />
                                                    </LargeCardElementTextV4>
                                                    <LargeCardElementTextV4>
                                                        <Skeleton
                                                            animation="wave"
                                                            width={'90%'}
                                                            height={'20px'}
                                                        />
                                                    </LargeCardElementTextV4>
                                                    <LargeCardElementTextV4>
                                                        <Skeleton
                                                            animation="wave"
                                                            width={'90%'}
                                                            height={'20px'}
                                                        />
                                                    </LargeCardElementTextV4>
                                                </LargeCardElementV4>
                                            )
                                        )}
                                    </animated.div>
                                </>
                            ) : (
                                <animated.div style={fadeElement}>
                                    {renderLatestRequest()}
                                </animated.div>
                            )}
                        </LargeCardListContainer>
                    </LandingCol>
                    <LandingCol className="col9">
                        <LargeCardTitleContainer>
                            <MediumCardH4>Top products</MediumCardH4>
                        </LargeCardTitleContainer>
                        <LargeCardListContainer>
                            <LargeCardElementV2>
                                <AiFillTags />
                            </LargeCardElementV2>
                            <LargeCardElementV2>
                                <MediumCardH3>
                                    {loading ? (
                                        <animated.span style={fadeLoader}>
                                            <Skeleton
                                                animation="wave"
                                                width={'100%'}
                                                height={'35px'}
                                            />
                                        </animated.span>
                                    ) : (
                                        <animated.span style={fadeElement}>
                                            {data?.best_product
                                                ?.total_purchases || '0'}
                                        </animated.span>
                                    )}
                                </MediumCardH3>
                            </LargeCardElementV2>
                            <LargeCardElementV2>
                                <LargeCardElementTextV2>
                                    {loading ? (
                                        <animated.span style={fadeLoader}>
                                            <Skeleton
                                                animation="wave"
                                                width={'100%'}
                                                height={'15px'}
                                            />
                                        </animated.span>
                                    ) : (
                                        <animated.span style={fadeElement}>
                                            {data?.best_product?.name ||
                                                'Add your first product'}
                                        </animated.span>
                                    )}
                                </LargeCardElementTextV2>
                            </LargeCardElementV2>
                            <LargeCardElementV2>
                                {data ? (
                                    <Chart
                                        options={{
                                            ...options3,
                                            labels:
                                                data.top_products_names.length <
                                                1
                                                    ? ['Unknown']
                                                    : data.top_products_names,
                                        }}
                                        series={
                                            data.top_products_values.length <
                                                1 ||
                                            !data.top_products_values[0]
                                                ? Array(
                                                      data.top_products_names
                                                          .length
                                                  ).fill(1)
                                                : data.top_products_values
                                        }
                                        type="donut"
                                        height="250px"
                                    />
                                ) : null}
                            </LargeCardElementV2>
                        </LargeCardListContainer>
                    </LandingCol>
                    <LandingCol className="col10">
                        <LargeCardTitleContainer>
                            <MediumCardH4>Latest licenses</MediumCardH4>
                        </LargeCardTitleContainer>
                        <LargeCardListContainer
                            style={{
                                overflowX: 'auto',
                                minHeight: '80%',
                            }}
                        >
                            <LargeCardElementV3
                                style={{
                                    fontweight: '600',
                                    backgroundColor: '#32394e',
                                }}
                            >
                                <LargeCardElementTextV3>
                                    ID:
                                </LargeCardElementTextV3>
                                <LargeCardElementTextV3>
                                    Client:
                                </LargeCardElementTextV3>
                                <LargeCardElementTextV3>
                                    Product(s):
                                </LargeCardElementTextV3>
                                <LargeCardElementTextV3>
                                    Added by:
                                </LargeCardElementTextV3>
                                <LargeCardElementTextV3>
                                    Date:
                                </LargeCardElementTextV3>
                            </LargeCardElementV3>
                            {loading ? (
                                <>
                                    <animated.div style={fadeLoader}>
                                        {[...Array(skeletonamount)].map(
                                            (elementInArray, index) => (
                                                <LargeCardElementV3 key={index}>
                                                    <LargeCardElementTextV3>
                                                        <Skeleton
                                                            animation="wave"
                                                            width={'90%'}
                                                            height={'20px'}
                                                        />
                                                    </LargeCardElementTextV3>
                                                    <LargeCardElementTextV3>
                                                        <Skeleton
                                                            animation="wave"
                                                            width={'90%'}
                                                            height={'20px'}
                                                        />
                                                    </LargeCardElementTextV3>
                                                    <LargeCardElementTextV3>
                                                        <Skeleton
                                                            animation="wave"
                                                            width={'90%'}
                                                            height={'20px'}
                                                        />
                                                    </LargeCardElementTextV3>
                                                    <LargeCardElementTextV3>
                                                        <Skeleton
                                                            animation="wave"
                                                            width={'90%'}
                                                            height={'20px'}
                                                        />
                                                    </LargeCardElementTextV3>
                                                    <LargeCardElementTextV3>
                                                        <Skeleton
                                                            animation="wave"
                                                            width={'90%'}
                                                            height={'20px'}
                                                        />
                                                    </LargeCardElementTextV3>
                                                </LargeCardElementV3>
                                            )
                                        )}
                                    </animated.div>
                                </>
                            ) : (
                                <animated.div style={fadeElement}>
                                    {renderLatestLicenses()}
                                </animated.div>
                            )}
                        </LargeCardListContainer>
                    </LandingCol>
                </LandingWrapper>
                <Footer />
            </MainWrapper>
        </>
    )
}

const LandingWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 12px 12px 24px 12px;
    grid-gap: 24px;
    grid-auto-rows: minmax(120px, auto);
    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    /* Grid colums */
    .col1 {
        background-color: var(--ul-second);
        grid-column: 1/3;
        grid-row: 1/3;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    }
    .col2,
    .col3,
    .col4 {
        background-color: var(--ul-second);
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    }

    .col5 {
        background-color: var(--ul-second);
        grid-column: 1/3;
        grid-row: 3/5;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    }

    .col6 {
        background-color: var(--ul-second);
        grid-column: 3/6;
        grid-row: 2/5;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    }

    .col7 {
        background-color: var(--ul-second);
        grid-column: 1/3;
        grid-row: 5/8;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
        max-width: 100%;
    }

    .col8 {
        background-color: var(--ul-second);
        grid-column: 3/5;
        grid-row: 5/8;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
        max-width: 100%;
    }

    .col9 {
        background-color: var(--ul-second);
        grid-column: 5/6;
        grid-row: 5/8;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
    }

    .col10 {
        background-color: var(--ul-second);
        grid-column: 1/6;
        grid-row: 8/11;
        border-radius: 0.25rem;
        box-shadow: 0 0.75rem 1.5rem rgb(18 38 63 / 3%);
        max-width: 100%;
    }

    /* Breaking points */
    @media screen and (max-width: 1200px) {
        .col1 {
            grid-column: 1/4;
        }

        .col2 {
            grid-column: 1;
            grid-row: 5;
        }
        .col3 {
            grid-column: 2;
            grid-row: 5;
        }
        .col4 {
            grid-column: 3;
            grid-row: 5;
        }

        .col5 {
            grid-column: 1/4;
            grid-row: 3/5;
        }

        .col6 {
            grid-column: 1/4;
            grid-row: 6/8;
        }

        .col7 {
            grid-column: 1/4;
            grid-row: 8/11;
        }

        .col8 {
            grid-column: 1/4;
            grid-row: 11/14;
        }

        .col9 {
            grid-column: 1/4;
            grid-row: 14/17;
        }

        .col10 {
            grid-column: 1/4;
            grid-row: 17/20;
        }
    }
    @media screen and (max-width: 768px) {
        .col2 {
            grid-column: 1/4;
            grid-row: 5;
        }
        .col3 {
            grid-column: 1/4;
            grid-row: 6;
        }
        .col4 {
            grid-column: 1/4;
            grid-row: 7;
        }
        .col5 {
            grid-column: 1/4;
            grid-row: 3/5;
        }

        .col6 {
            grid-column: 1/4;
            grid-row: 8/10;
        }

        .col7 {
            grid-column: 1/4;
            grid-row: 10/12;
        }

        .col8 {
            grid-column: 1/4;
            grid-row: 12/14;
        }

        .col9 {
            grid-column: 1/4;
            grid-row: 14/16;
        }

        .col10 {
            grid-column: 1/4;
            grid-row: 16/18;
        }
    }
`

/* Cards */

const CardsLinkBtn = styled(Link)`
    color: #fff;
    display: flex;
    gap: 2px;
    align-items: center;
    background-color: var(--ul-highlight-main);
    border-color: var(--ul-highlight-main);
    padding: 0.25rem 0.5rem;
    font-size: 0.71094rem;
    border-radius: 0.2rem;
    text-align: center;
    justify-content: center;
    width: 110px;
`

const CardsLinkButton = styled.button`
    color: #fff;
    display: flex;
    gap: 2px;
    outline: none;
    border: none;
    cursor: pointer;
    align-items: center;
    background-color: var(--ul-highlight-main);
    border-color: var(--ul-highlight-main);
    padding: 0.25rem 0.5rem;
    font-size: 0.71094rem;
    border-radius: 0.2rem;
    text-align: center;
    justify-content: center;
    width: 110px;
`

/* Small card */
const SmallCardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin-left: 20px;
    margin-right: 20px;
`
const SmallCardElement = styled.div``
const SmallCardTitle = styled.p`
    color: var(--ul-purple);
    margin-bottom: 10px;
    font-size: 0.8125rem;
    font-weight: 500;
`
const SmallCardH4 = styled.h4`
    color: #f6f6f6;
    font-weight: 500;
    font-size: 1.21875rem;
`
const SmallCardSpan = styled.span`
    align-items: center;
    background-color: var(--ul-highlight-main);
    color: #fff;
    display: flex;
    font-weight: 500;
    height: 48px;
    width: 48px;
    justify-content: center;
    border-radius: 50%;
    font-size: 20px;
`

/* Medium card */

/* Containers */
const MediumCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`
const MediumCardElementContainer = styled.div`
    height: 50%;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    :first-child {
        background-color: #34406b;
        border-radius: 0.25rem 0.25rem 0 0;
    }
`
const MediumCardElementContainerV2 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const MediumCardElement = styled.div`
    width: 100%;
`
const MediumCardColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
    justify-content: space-between;
    height: 100%;
`
const MediumCardColumn = styled.div`
    display: flex;
    flex-direction: column;
`

/* Medium card texts */
const MediumCardText = styled.p`
    color: var(--ul-highlight-main);
    font-size: 0.8125rem;
    font-weight: 400;
`
const MediumCardTextV2 = styled.p`
    color: #c3cbe4;
    font-size: 0.8125rem;
    font-weight: 400;
    margin-bottom: 8px;
`
const MediumCardH5 = styled.h5`
    color: var(--ul-highlight-main);
    font-size: 1.01562rem;
    font-weight: 500;
`
const MediumCardH5V2 = styled.h5`
    color: #f6f6f6;
    font-size: 1.01562rem;
    font-weight: 500;
    margin-bottom: 8px;
`
const MediumCardH4 = styled.h4`
    font-size: 15px;
    margin: 0 0 7px;
    font-weight: 600;
    color: #f6f6f6;
`
const MediumCardH3 = styled.h3`
    font-size: 1.42188rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: #f6f6f6;
`

/* Images */
const MediumCardImg = styled.img`
    border-radius: 50%;
    padding: 3px;
    background-color: #32394e;
    height: 72px;
    margin-top: -3rem;
`
const MediumCardHeaderImg = styled.img`
    width: 100%;
    height: 100%;
    max-height: 130px;
`

/* Large card */

/* Containers */
const ChartContainer = styled.div`
    width: 100%;
    height: 100%;
`
const LargeCardListContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 0.8125rem;
    font-weight: 400;
`
const LargeCardElementV3 = styled.div`
    display: flex;
    padding: 12px;
    min-width: 1000px;
    border-bottom: 1px solid #32394e;
`
const LargeCardElementV4 = styled.div`
    display: flex;
    padding: 12px;
    min-width: 500px;
    border-bottom: 1px solid #32394e;
`
const LargeCardElementTextV4 = styled.div`
    color: #a6b0cf;
    width: 33.3%;
`
const LargeCardElementV2 = styled.div`
    justify-content: center;
    text-align: center;
    svg {
        font-size: 50px;
        color: #546de4;
    }
`
const LargeCardElementTextV2 = styled.p`
    color: #a6b0cf;
    font-size: 0.8125rem;
    font-weight: 400;
`
const LargeCardElementSpan = styled.span`
    font-weight: 600;
`
const LargeCardElementTextV3 = styled.p`
    color: #a6b0cf;
    width: 20%;
    min-width: 200px;
`

const LargeCardTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    @media screen and (max-width: 992px) {
        flex-direction: column;
    }
`
const LargeCardButtons = styled.div`
    display: flex;
    gap: 15px;
`
const LargeCardButton = styled.button`
    background-color: transparent;
    outline: none;
    border: none;
    color: #f6f6f6;
    font-weight: 500;
    cursor: pointer;
`

const LandingCol = styled.div`
    background-color: blueviolet;
`

const CreateLicenseAdvancedGroup = styled.div`
    display: flex;
    width: 100%;
`

export default Landing
