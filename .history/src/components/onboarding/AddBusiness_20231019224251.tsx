                      {/* Business Cover later */}
                      <Box mb={3}>
                        <Box
                          sx={{
                            display: `flex`,
                            alignItems: `center`,
                            justifyContent: `center`,
                            position: `relative`,
                          }}
                        >
                          {coverPreviewImg === null ? (
                            <Box
                              sx={{
                                width: `100%`,
                                height: `100px`,
                                border: `solid 1px #ccc`,
                                borderRadius: `10px`,
                                backgroundColor: `primary.main`,
                                display: `flex`,
                                alignItems: `center`,
                                justifyContent: `center`,
                                textAlign: `center`,
                              }}
                            >
                              <AddCoverButton htmlFor="image">
                                <Box
                                  sx={{
                                    width: `3rem`,
                                    height: `3rem`,
                                    borderRadius: `50%`,
                                    backgroundColor: `#fff`,
                                    display: `flex`,
                                    alignItems: `center`,
                                    justifyContent: `center`,
                                    boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                                  }}
                                >
                                  <CameraAltIcon
                                    sx={{
                                      fontSize: `2rem`,
                                      color: `primary.main`,
                                    }}
                                  />
                                </Box>
                                <Input
                                  type="file"
                                  setPreviewImg={setCoverPreviewImg}
                                  setFileName={setCoverImgName}
                                  name="image"
                                  accept="image/*"
                                />
                              </AddCoverButton>
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                width: `100%`,
                                height: `100px`,
                                display: `flex`,
                                alignItems: `center`,
                                justifyContent: `center`,
                                position: `relative`,
                              }}
                            >
                              <Image
                                src={coverPreviewImg}
                                alt="profileImg"
                                fill
                                quality={100}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{
                                  height: `100%`,
                                  borderRadius: `10px`,
                                  objectFit: `cover`,
                                }}
                              />
                              <Box sx={{ zIndex: 9 }}>
                                <AddCoverButton htmlFor="image">
                                  <Box
                                    sx={{
                                      borderRadius: `30px`,
                                      backgroundColor: `#fff`,
                                      display: `flex`,
                                      alignItems: `center`,
                                      padding: `10px`,
                                      justifyContent: `center`,
                                      boxShadow: `0px 4.82797px 12.0699px rgba(0, 0, 0, 0.1)`,
                                    }}
                                  >
                                    <CameraAltIcon
                                      sx={{
                                        fontSize: `2rem`,
                                        color: `primary.main`,
                                      }}
                                    />
                                  </Box>
                                  <Input
                                    type="file"
                                    setPreviewImg={setCoverPreviewImg}
                                    setFileName={setCoverImgName}
                                    name="image"
                                    accept="image/*"
                                  />
                                </AddCoverButton>
                              </Box>
                            </Box>
                          )}
                        </Box>
                        <small>{`{ jpg, png, jpeg } | The file should be less than 1mb`}</small>
                      </Box>

                      <Box
                        sx={{
                          display: `grid`,
                          gridTemplateColumns: {
                            xs: `1fr`,
                            sm: `1fr`,
                            md: `1fr 1fr`,
                            lg: `1fr 1fr`,
                            xl: `1fr 1fr`,
                          },
                          gap: `1rem`,
                          mb: 2,
                        }}
                      >
                        <Box>
                          <MultipleSelectState
                            name="operationStates"
                            setServices={setSelectedOpsState}
                            states={data?.states}
                          />
                        </Box>
                        <Box>
                          <MultipleSelectCity
                            name="operationCities"
                            setServices={setSelectedCities}
                            cities={allCities}
                          />
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: `grid`,
                          gridTemplateColumns: {
                            xs: `1fr`,
                            sm: `1fr`,
                            md: `1fr 1fr`,
                            lg: `1fr 1fr`,
                            xl: `1fr 1fr`,
                          },
                          gap: `1rem`,
                          mb: 2,
                        }}
                      >
                        <Box>
                          <FormInput
                            ariaLabel="companyName"
                            name="name"
                            type="text"
                            placeholder="Company Name"
                          />
                        </Box>
                        <Box>
                          <MultiSelectServices
                            setServices={setServicesType}
                            name="services"
                            label="Selected Services"
                            services={services}
                          />
                        </Box>
                      </Box>

                      <Box>
                        <TextArea
                          name="description"
                          rows={4}
                          placeholder="Enter Company description"
                        />
                      </Box>